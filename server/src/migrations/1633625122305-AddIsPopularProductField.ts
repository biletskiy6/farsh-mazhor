import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsPopularProductField1633625122305 implements MigrationInterface {
    name = 'AddIsPopularProductField1633625122305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "is_popular" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "is_popular"`);
    }

}
