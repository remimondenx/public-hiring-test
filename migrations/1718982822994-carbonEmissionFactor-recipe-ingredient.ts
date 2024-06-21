import { MigrationInterface, QueryRunner } from "typeorm";

export class CarbonEmissionFactorRecipeIngredient1718982822994 implements MigrationInterface {
    name = 'CarbonEmissionFactorRecipeIngredient1718982822994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ingredients_unit_enum" AS ENUM('kg')`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" "public"."ingredients_unit_enum" NOT NULL, "quantity" double precision NOT NULL, "recipeId" integer, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."carbon_emission_factors_unit_enum" AS ENUM('kg')`);
        await queryRunner.query(`CREATE TYPE "public"."carbon_emission_factors_source_enum" AS ENUM('Agrybalise')`);
        await queryRunner.query(`CREATE TABLE "carbon_emission_factors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" "public"."carbon_emission_factors_unit_enum" NOT NULL, "emissionCO2eInKgPerUnit" double precision NOT NULL, "source" "public"."carbon_emission_factors_source_enum" NOT NULL, CONSTRAINT "PK_e6a201ea58a7b4cdec0ca1c0c61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_f20a9542c7a02105fa40a08d95b" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_f20a9542c7a02105fa40a08d95b"`);
        await queryRunner.query(`DROP TABLE "carbon_emission_factors"`);
        await queryRunner.query(`DROP TYPE "public"."carbon_emission_factors_source_enum"`);
        await queryRunner.query(`DROP TYPE "public"."carbon_emission_factors_unit_enum"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TYPE "public"."ingredients_unit_enum"`);
    }

}
