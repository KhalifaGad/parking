import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CarsController } from "../controllers";
import { isValidMongoId, validate } from "../middlewares";
import { carsValidationSchemas } from "../validations";

const carsRouter = Router();

carsRouter
  .use("/")
  .get(asyncHandler(CarsController.list("listCars", ["brand", "model"])))
  .post(
    validate(carsValidationSchemas.addCarSchema),
    isValidMongoId("body", "employee"),
    asyncHandler(CarsController.create)
  );

carsRouter.use(
  "/:plateNumber",
  asyncHandler(CarsController.get("getCar", "plateNumber"))
);

carsRouter
  .use("/:id", isValidMongoId("query", "id"))
  .put(
    isValidMongoId("body", "employee", false),
    validate(carsValidationSchemas.editCarSchema),
    asyncHandler(CarsController.update("updateCar", "id"))
  )
  .delete(asyncHandler(CarsController.delete("deleteCar", "id")));

export { carsRouter };
