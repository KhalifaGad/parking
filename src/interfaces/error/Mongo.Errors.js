import mongoose from "mongoose";
import { SERVER_ERROR } from "./constants";

class MongoDatabaseErrors {
  isDatabaseError(err) {
    return err instanceof mongoose.Error || this.isMongoError(err);
  }

  isMongoError(err) {
    return err.name === "MongoError";
  }

  isValidationError(err) {
    return err instanceof mongoose.Error.ValidationError;
  }

  handleValidationError(err) {
    let message = "";
    if (Array.isArray(err.errors)) {
      message = err.errors.map(
        (validationErrItem) => validationErrItem.message
      );
      return {
        statusCode: 422,
        error: "Bad Data",
        message: message,
      };
    } else {
      const [, value] = Object.entries(err.errors)[0];
      message = value.properties.message;
      return {
        statusCode: 422,
        error: "Bad Data",
        message: message,
      };
    }
  }

  handleAppDatabaseError(err) {
    console.error(`Database Error: ${err}`);
    return SERVER_ERROR;
  }

  handleError(err) {
    if (this.isValidationError(err)) return this.handleValidationError(err);
    return this.handleAppDatabaseError(err);
  }
}

export default MongoDatabaseErrors;
