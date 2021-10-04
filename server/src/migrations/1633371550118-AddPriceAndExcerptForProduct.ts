import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceAndExcerptForProduct1633371550118 implements MigrationInterface {
    name = 'AddPriceAndExcerptForProduct1633371550118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "excerpt" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "price" numeric NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "excerpt"`);
    }

}
