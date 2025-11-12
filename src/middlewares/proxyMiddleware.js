import { createProxyMiddleware } from "express-http-proxy";
import { sendError } from "../utils/response.js";

export function createProxyToService(serviceUrl) {
  return createProxyMiddleware({
    target: serviceUrl,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
      "^/auth": "/api/v1/auth",
      "^/flights": "/api/v1/flights",
      "^/bookings": "/api/v1/bookings",
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      sendError(res, "Service unavailable", 503);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["X-Content-Type-Options"] = "nosniff";
      proxyRes.headers["X-Frame-Options"] = "DENY";
      proxyRes.headers["X-XSS-Protection"] = "1; mode=block";
      proxyRes.headers["Strict-Transport-Security"] =
        "max-age=31536000; includeSubDomains";
    },
  });
}
