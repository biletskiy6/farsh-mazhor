import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrderFieldToCategories1633867868882 implements MigrationInterface {
    name = 'AddOrderFieldToCategories1633867868882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "order" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "order"`);
    }

}
