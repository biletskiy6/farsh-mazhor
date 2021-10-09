import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDecimalPriceToString1633789843905 implements MigrationInterface {
    name = 'ChangeDecimalPriceToString1633789843905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ALTER COLUMN "is_popular" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ALTER COLUMN "is_popular" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ALTER COLUMN "is_popular" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."product" ALTER COLUMN "is_popular" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "price" numeric NOT NULL DEFAULT '0'`);
    }

}
