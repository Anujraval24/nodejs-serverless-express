import { userRoute } from "../routes";

const expressRoutes = (server) => {
  return new Promise((resolve, reject) => {
    // Routes
    server.use("/users", userRoute);

    /** Default Route */
    server.use("/", (req, res) => {
      res.status(200).send({
        success: true,
        message: "Node JS Serverless Express API",
        data: [],
        totalCount: null,
      });
    });

    resolve();
  });
};

export default expressRoutes;
