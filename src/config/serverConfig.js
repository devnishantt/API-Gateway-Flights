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
