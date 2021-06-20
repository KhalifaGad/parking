import { AppErrors } from "interfaces";

function formatError(messages, req) {
  return messages.map((msg) => req.t(msg)).join(" & ");
}

function errorHandler(err, req, res, _) {
  const handledError = AppErrors.errorHandler(err);
  return res.status(handledError.statusCode).send({
    error: {
      ...handledError,
      message:
        typeof handledError.message === "string"
          ? req.t(handledError.message)
          : formatError(handledError.message, req),
    },
  });
}

export { errorHandler };
