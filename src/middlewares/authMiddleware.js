import { jwtConfig } from "../config/serverConfig.js";
import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

export function authenticate(req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    sendError(res, "Access token is required", 401);
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, "Invalid or expired token", 401);
  }
  req.user = decoded;
  next();
}

export function optionalAuthMiddleware(req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);
    } catch (error) {
      // Continue without user context if token is invalid
    }
  }

  next();
}
