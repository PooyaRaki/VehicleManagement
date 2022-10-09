import express from "express";
import * as core from "express-serve-static-core";

export const Router = (): core.Router => {
  return express.Router();
};
