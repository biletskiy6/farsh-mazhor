import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDescriptionToCategory1633371253655 implements MigrationInterface {
    name = 'AddDescriptionToCategory1633371253655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "description"`);
    }

}
