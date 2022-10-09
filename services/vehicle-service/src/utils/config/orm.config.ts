import { DataSource } from 'typeorm';
import { DatabaseConfig } from './database.config';

export default new DataSource(DatabaseConfig);
