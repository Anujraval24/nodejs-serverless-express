import serverless from "serverless-http";
import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

/** Initialize Express Server */
export const server = express();

/** Environment config */
dotenv.config({ path: "src/config/.env" });

// CORS
server.use(cors({ origin: true, credentials: true }));
// API LOG
server.use(morgan("dev"));
// XSS Attack Security
server.use(helmet());
// Compress Requests
server.use(compression());

/** Routes */
import { userRoute } from "./routes";

server.use("/users", userRoute);

server.use("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Node JS Serverless Express API",
    data: [],
    totalCount: null,
  });
});
export const handler = serverless(server);
