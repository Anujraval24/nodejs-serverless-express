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

const expressInit = (server) => {
  return new Promise((resolve, reject) => {
    /** Middlewares */
    // CORS
    server.use(cors({ origin: true, credentials: true }));
    // API LOG
    server.use(morgan("dev"));
    // XSS Attack Security
    server.use(helmet());
    // Compress Requests
    server.use(compression());

    resolve();
  });
};

export default expressInit;

