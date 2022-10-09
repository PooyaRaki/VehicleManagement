import { DatabaseConfig } from '@utils/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class Database {
    public static _instance: Promise<DataSource>;

    private constructor()
    {
        //
    }

    private async connect(): Promise<DataSource>
    {
        return await (new DataSource(DatabaseConfig)).initialize();
    }

    public static async getInstance(): Promise<DataSource>
    {
        if (this._instance) {
            return this._instance;
        }

        this._instance = (new Database()).connect();

        return this._instance;
    }
}