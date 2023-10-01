import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./database/connection";
import errorHandler from "./middleware/errorHandler";
import EnvManager from "./config/EnvManager";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get("/healthz", (req, res) => {
    return res.json({ ok: true, environment: EnvManager.getNodeEnv() });
  });

  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  app.use(errorHandler);

  return app;
};
