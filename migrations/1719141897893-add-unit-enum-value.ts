import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUnitEnumValue1719141897893 implements MigrationInterface {
    name = 'AddUnitEnumValue1719141897893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."ingredients_unit_enum" RENAME TO "ingredients_unit_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ingredients_unit_enum" AS ENUM('kg', 'l')`);
        await queryRunner.query(`ALTER TABLE "ingredients" ALTER COLUMN "unit" TYPE "public"."ingredients_unit_enum" USING "unit"::"text"::"public"."ingredients_unit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ingredients_unit_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."carbon_emission_factors_unit_enum" RENAME TO "carbon_emission_factors_unit_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."carbon_emission_factors_unit_enum" AS ENUM('kg', 'l')`);
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" ALTER COLUMN "unit" TYPE "public"."carbon_emission_factors_unit_enum" USING "unit"::"text"::"public"."carbon_emission_factors_unit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."carbon_emission_factors_unit_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."carbon_emission_factors_unit_enum_old" AS ENUM('kg')`);
        await queryRunner.query(`ALTER TABLE "carbon_emission_factors" ALTER COLUMN "unit" TYPE "public"."carbon_emission_factors_unit_enum_old" USING "unit"::"text"::"public"."carbon_emission_factors_unit_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."carbon_emission_factors_unit_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."carbon_emission_factors_unit_enum_old" RENAME TO "carbon_emission_factors_unit_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."ingredients_unit_enum_old" AS ENUM('kg')`);
        await queryRunner.query(`ALTER TABLE "ingredients" ALTER COLUMN "unit" TYPE "public"."ingredients_unit_enum_old" USING "unit"::"text"::"public"."ingredients_unit_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."ingredients_unit_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ingredients_unit_enum_old" RENAME TO "ingredients_unit_enum"`);
    }

}
