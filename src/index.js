import express from "express";
import { corsConfig, PORT } from "./config/serverConfig.js";
import logger from "./config/loggerConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import gatewayRouter from "./routes/gatewayRoutes.js";

const app = express();

app.use("/", gatewayRouter);

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Press Ctrl+C to stop the server`);
});
