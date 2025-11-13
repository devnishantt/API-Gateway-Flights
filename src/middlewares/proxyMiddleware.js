import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { sendError } from "../utils/response.js";
import logger from "../config/loggerConfig.js";

export function createProxyToService(serviceUrl) {
  return createProxyMiddleware({
    target: serviceUrl,
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: (path, req) => {
      const mappings = [
        "auth",
        "flights",
        "airplanes",
        "airports",
        "cities",
        "bookings",
      ];
      for (const key of mappings) {
        if (path.startsWith(`/${key}`))
          return path.replace(`/${key}`, `/api/v1/${key}`);
      }
      return path;
    },
    onProxyReq: (proxyReq, req, res) => {
      logger.info(
        `[ProxyReq] ${req.method} ${req.originalUrl} -> ${serviceUrl}${proxyReq.path}`
      );
      fixRequestBody;
    },
    onProxyRes: (proxyRes, req, res) => {
      logger.info(
        `[ProxyRes] ${req.method} ${req.originalUrl} <- ${serviceUrl} | Status: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      logger.error(
        `[ProxyError] ${req.method} ${req.originalUrl}: ${err.message}`
      );
      sendError(res, "Upstream service unavailable", 503);
    },
    proxyTimeout: 15000,
    timeout: 15000,
  });
}
