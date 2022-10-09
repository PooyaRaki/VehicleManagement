import { Application } from "@utils/types";
import express from "express";

export const Server = (): Application => {
  const app: Application = express();

  return app;
};
