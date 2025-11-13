import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "../config/serverConfig.js";
import { sendError } from "../utils/response.js";

export function createRateLimiterMiddleware() {
  return rateLimit({
    windowMs: rateLimitConfig.windowMs, 
    max: rateLimitConfig.maxRequests, 
    keyGenerator: (req, res) => {
      if (req.user && req.user.id) {
        return `user:${req.user.id}`;
      }
      return req.ip || req.connection.remoteAddress;
    },
    handler: (req, res) => {
      const retryAfter = Math.ceil(rateLimitConfig.windowMs / 1000);
      res.set("Retry-After", retryAfter);
      return sendError(
        res,
        `Rate limit exceeded. Maximum ${
          rateLimitConfig.maxRequests
        } requests per ${
          rateLimitConfig.windowMs / 1000
        }s allowed. Try again in ${retryAfter} seconds.`,
        429
      );
    },
    standardHeaders: true, 
    legacyHeaders: false, 
   
    skip: (req) => {
      return req.path === "/api/v1/health";
    },
  });
}
