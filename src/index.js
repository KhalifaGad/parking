require("dotenv").config();
import { database } from "infra";
import { Server } from "interfaces";

database
  .connect(process.env.MONGODB_URI)
  .then(() => {
    new Server(process.env.PORT || 3001).start();
  })
  .catch((err) => {
    console.log("Can not connect to database", err);
  });
