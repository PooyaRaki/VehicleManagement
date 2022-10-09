import { DataSourceOptions } from "typeorm";
import { AppConfig } from "./app.config";

export const DatabaseConfig: DataSourceOptions = {
    logging: AppConfig.isInDevelopment(),
    type: 'sqlite',
    database: <string> process.env.DATABASE_URL,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{ .ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'migration',
}