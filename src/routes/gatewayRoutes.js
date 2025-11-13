import { Router } from "express";
import { sendSuccess } from "../utils/response.js";
import { createProxyToService } from "../middlewares/proxyMiddleware.js";
import { serviceURLS } from "../config/serverConfig.js";
import {
  authenticate,
  optionalAuthMiddleware,
} from "../middlewares/authMiddleware.js";

const gatewayRouter = Router();

gatewayRouter.get("/health", (req, res) => {
  sendSuccess(
    res,
    { timestamp: new Date().toISOString() },
    "API Gateway is running",
    200
  );
});

gatewayRouter.post("/auth/register", createProxyToService(serviceURLS.AUTH));
gatewayRouter.post("/auth/login", createProxyToService(serviceURLS.AUTH));
gatewayRouter.post(
  "/auth/refresh-token",
  createProxyToService(serviceURLS.AUTH)
);

gatewayRouter.post(
  "/auth/logout",
  authenticate,
  createProxyToService(serviceURLS.AUTH)
);
gatewayRouter.get(
  "/auth/profile",
  authenticate,
  createProxyToService(serviceURLS.AUTH)
);
gatewayRouter.patch(
  "/auth/update",
  authenticate,
  createProxyToService(serviceURLS.AUTH)
);
gatewayRouter.post(
  "/auth/change-password",
  authenticate,
  createProxyToService(serviceURLS.AUTH)
);
gatewayRouter.delete(
  "/auth/delete",
  authenticate,
  createProxyToService(serviceURLS.AUTH)
);

// Flight routes
gatewayRouter.get(
  "/flights",
  optionalAuthMiddleware,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.get(
  "/flights/:id",
  optionalAuthMiddleware,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.post(
  "/flights",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.patch(
  "/flights/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.patch(
  "/flights/:id/remaining-seats",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.delete(
  "/flights/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);

// Airplane routes
gatewayRouter.get("/airplanes", createProxyToService(serviceURLS.FLIGHT));
gatewayRouter.get("/airplanes/:id", createProxyToService(serviceURLS.FLIGHT));
gatewayRouter.post(
  "/airplanes",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.patch(
  "/airplanes/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.delete(
  "/airplanes/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);

// Airport routes
gatewayRouter.get("/airports", createProxyToService(serviceURLS.FLIGHT));
gatewayRouter.get("/airports/:id", createProxyToService(serviceURLS.FLIGHT));
gatewayRouter.post(
  "/airports",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.patch(
  "/airports/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.delete(
  "/airports/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);

// City routes
gatewayRouter.get("/cities", createProxyToService(serviceURLS.FLIGHT));
gatewayRouter.get("/cities/:id", createProxyToService(serviceURLS.FLIGHT));
gatewayRouter.post(
  "/cities",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.patch(
  "/cities/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);
gatewayRouter.delete(
  "/cities/:id",
  authenticate,
  createProxyToService(serviceURLS.FLIGHT)
);

// Booking routes
gatewayRouter.get(
  "/bookings",
  authenticate,
  createProxyToService(serviceURLS.BOOKING)
);
gatewayRouter.get(
  "/bookings/:id",
  authenticate,
  createProxyToService(serviceURLS.BOOKING)
);
gatewayRouter.post(
  "/bookings",
  authenticate,
  createProxyToService(serviceURLS.BOOKING)
);
gatewayRouter.post(
  "/bookings/:id/payment",
  authenticate,
  createProxyToService(serviceURLS.BOOKING)
);
gatewayRouter.patch(
  "/bookings/:id/cancel",
  authenticate,
  createProxyToService(serviceURLS.BOOKING)
);
gatewayRouter.post(
  "/bookings/cancel-old",
  authenticate,
  createProxyToService(serviceURLS.BOOKING)
);

export default gatewayRouter;
