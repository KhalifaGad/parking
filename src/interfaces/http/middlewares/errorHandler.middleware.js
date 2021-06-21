import { AppErrors } from "interfaces";

function errorHandler(err, req, res, _) {
  const handledError = AppErrors.errorHandler(err);
  return res.status(handledError.statusCode).send({
    error: {
      ...handledError,
      message:
        typeof handledError.message === "string"
          ? handledError.message
          : handledError.message.join(" & "),
    },
  });
}

export { errorHandler };
