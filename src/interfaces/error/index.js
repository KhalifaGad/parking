import BoomHttpErrors from "./Boom.Errors";
import MongoDatabaseErrors from "./Mongo.Errors";
import { SERVER_ERROR } from "./constants";

class AppErrors {
  constructor() {
    this.http = new BoomHttpErrors();
    this.db = new MongoDatabaseErrors();
  }

  __handleUnkownError(err) {
    console.error({ UNKOWN_ERROR: err });
    return SERVER_ERROR;
  }

  errorHandler(err) {
    if (typeof err === "string") {
      err = this.http.badRequest(err);
      return this.http.handleError(err);
    }
    if (this.http.isHttpError(err)) return this.http.handleError(err);
    if (this.db.isDatabaseError(err)) return this.db.handleError(err);
    return this.__handleUnkownError(err);
  }
}

export default new AppErrors();
