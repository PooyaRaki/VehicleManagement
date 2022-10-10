import { DataSourceOptions } from "typeorm";
import { AppConfig } from "./app.config";

if (process.env.NODE_ENV === undefined) {
  /* eslint @typescript-eslint/no-var-requires: "off" */
  require("dotenv").config({
    path: ".env",
  });
}

export const DatabaseConfig: DataSourceOptions = {
  logging: AppConfig.isInDevelopment(),
  type: "sqlite",
  database: <string>process.env.DATABASE_URL,
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{ .ts,.js}"],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: "migration",
};
