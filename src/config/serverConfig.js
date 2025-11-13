import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const LOG_LEVEL =
  process.env.LOG_LEVEL ||
  (process.env.NODE_ENV === "development" ? "debug" : "info");


export const serviceURLS = {
  AUTH: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
  FLIGHT: process.env.FLIGHT_SERVICE_URL || "http://localhost:3002",
  BOOKING: process.env.BOOKING_SERVICE_URL || "http://localhost:3003",
};

export const jwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-jwt-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};

export const rateLimitConfig = {
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  maxRequests: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
  keyGenerator: process.env.RATE_LIMIT_KEY_GENERATOR || "ip", // 'ip' or 'user'
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

export const corsConfig = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
