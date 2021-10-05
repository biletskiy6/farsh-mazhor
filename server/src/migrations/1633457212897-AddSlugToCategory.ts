import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlugToCategory1633457212897 implements MigrationInterface {
    name = 'AddSlugToCategory1633457212897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "slug" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "slug"`);
    }

}
