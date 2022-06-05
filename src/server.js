import express from "express";
import serverless from "serverless-http";

import { expressInitialization, expressRoutes } from "./lib";

const server = express();

(async () => {
  // Initialize Express Server Functionality
  await expressInitialization(server);

  // Initialize Express Routes
  await expressRoutes(server);
})();

export const handler = serverless(server);
