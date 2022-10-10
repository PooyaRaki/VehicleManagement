if (process.env.NODE_ENV === undefined) {
  /* eslint @typescript-eslint/no-var-requires: "off" */
  require("dotenv").config({
    path: ".env",
  });
}

export * from "./orm.config";
export * from "./app.config";
export * from "./api.config";
export * from "./database.config";
export * from "./validator.config";
