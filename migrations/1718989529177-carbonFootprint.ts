import { MigrationInterface, QueryRunner } from "typeorm";

export class CarbonFootprint1718989529177 implements MigrationInterface {
    name = 'CarbonFootprint1718989529177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."carbon_footprints_source_enum" AS ENUM('Agrybalise')`);
        await queryRunner.query(`CREATE TABLE "carbon_footprints" ("id" SERIAL NOT NULL, "source" "public"."carbon_footprints_source_enum" NOT NULL, "emissionCO2eInKgPerUnit" double precision NOT NULL, "recipeId" integer, CONSTRAINT "PK_a8b03661109eb3a419b3fbeb455" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carbon_footprints" ADD CONSTRAINT "FK_457585ceaff9a7c7fae68c7cd58" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carbon_footprints" DROP CONSTRAINT "FK_457585ceaff9a7c7fae68c7cd58"`);
        await queryRunner.query(`DROP TABLE "carbon_footprints"`);
        await queryRunner.query(`DROP TYPE "public"."carbon_footprints_source_enum"`);
    }

}
