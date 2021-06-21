import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares";
import { router } from "./routes";

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setup();
  }

  setup() {
    const whitelist = ["http://localhost:3000"];
    this.app
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .disable("x-powered-by")
      .use(
        cors(function (req, callback) {
          let options = {
            credentials: true,
            origin: true,
          };

          let errorMessage = "Not allowed origin";

          const origin = req.header("Origin");
          const xOrigin = req.header("x-origin");

          if (
            whitelist.indexOf(origin) !== -1 ||
            (!origin && xOrigin === "mobile")
          ) {
            errorMessage = null;
          }

          return callback(errorMessage, options);
        })
      );

    this.app.use("/api/v1", router);

    this.app.use(errorHandler);

    this.app.use((req, res, _next) => {
      if (!req.route) res.status(404).send("Not found!");
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server has started on port: ${this.port}`);
    });
  }
}

export default Server;
