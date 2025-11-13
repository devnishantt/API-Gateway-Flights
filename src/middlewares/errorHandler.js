import logger from "../config/loggerConfig.js";
import { sendError } from "../utils/response.js";

export default function errorHandlerMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`Error: ${message}`, {
    statusCode,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  sendError(res, message, statusCode);
}
