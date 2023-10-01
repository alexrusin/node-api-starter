import { NextFunction, Request, Response } from "express";
import logger from "../utils/Logger";
import EnvManager from "../config/EnvManager";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent || EnvManager.getNodeEnv() === "development") {
    return next(error);
  }

  logger.error`Error handler: ${error}`;

  res.status(400).json({
    error: {
      message:
        error.message || "An error occurred. Please view logs for more details",
    },
  });
}
