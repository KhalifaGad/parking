import { AppErrors } from "interfaces";
import { isValidObjectId } from "mongoose";

export function validate(schema, validateQuery = false) {
  return async (req, _res, next) => {
    try {
      const validationObj = validateQuery ? req.query : req.body;
      await schema.validate(validationObj, {
        abortEarly: false,
        strict: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      next(AppErrors.http.badData(err.errors));
    }
  };
}

export function isValidMongoId(lookupObjName, lookupPropName, required = true) {
  return (req, _res, next) => {
    const mongoId = req[lookupObjName][lookupPropName];
    if (!required && !mongoId) return next();
    isValidObjectId(mongoId)
      ? next()
      : next(AppErrors.http.badData("Not valid resource id"));
  };
}
