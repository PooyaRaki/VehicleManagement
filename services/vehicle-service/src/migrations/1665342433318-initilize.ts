import { MigrationInterface, QueryRunner } from "typeorm";

export class initilize1665342433318 implements MigrationInterface {
    name = 'initilize1665342433318';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Price" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "plan_id" text NOT NULL, "name" text NOT NULL, "currency" text NOT NULL, "price" integer NOT NULL, "is_taxable" boolean NOT NULL, "description" text NOT NULL, "per_min_pricing" text NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_17dff243f46b84b060cb8d61fe" ON "Price" ("plan_id") `);

        await queryRunner.query(`CREATE TABLE "Vehicle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bike_id" text NOT NULL, "lat" real NOT NULL, "lon" real NOT NULL, "is_reserved" boolean NOT NULL, "is_disabled" boolean NOT NULL, "pricing_plan_id" text NOT NULL, "vehicle_type_id" text NOT NULL, "rental_uris" text NOT NULL, "current_range_meters" integer NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "bikeId" ON "Vehicle" ("bike_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_abe1cbab379857b9f6381e2acf" ON "Vehicle" ("is_reserved") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac451561df284e1ac6ffe2e6f9" ON "Vehicle" ("is_disabled") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4d7a56a4e211fbf3e752a19c1" ON "Vehicle" ("vehicle_type_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_04ccfe89a3f65c74734e59544b" ON "Vehicle" ("current_range_meters") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_04ccfe89a3f65c74734e59544b"`);
        await queryRunner.query(`DROP INDEX "IDX_e4d7a56a4e211fbf3e752a19c1"`);
        await queryRunner.query(`DROP INDEX "IDX_ac451561df284e1ac6ffe2e6f9"`);
        await queryRunner.query(`DROP INDEX "IDX_abe1cbab379857b9f6381e2acf"`);
        await queryRunner.query(`DROP TABLE "Vehicle"`);

        await queryRunner.query(`DROP TABLE "Price"`);
    }

}
