import { AppConfig } from "@utils/config";
import helmet from "helmet";
import express, { urlencoded } from "express";
import compression from "compression";
import { errorHandler, Server } from "@app/index";
import { RegisterDocumentation, RegisterRoutes } from "./routes";
import { Database } from "@app/database";
import { CronJobs } from "jobs";

(async function bootstrap(): Promise<void> {
  const app = Server();

  app.use(errorHandler);
  app.use(helmet());
  app.use(compression());
  app.use(
    urlencoded({
      extended: true,
    }),
  );  
  app.use(express.json());

  RegisterRoutes(app);
  RegisterDocumentation(app);

  await Database.getInstance();

  CronJobs();

  app.listen(AppConfig.port, () => {
    console.log('App is running!');
  });
})();