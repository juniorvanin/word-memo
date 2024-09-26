import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWordTable1726773250719 implements MigrationInterface {
  name = 'AddWordTable1726773250719';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "word" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "word" character varying NOT NULL, "syllables" character varying NOT NULL, "example" character varying NOT NULL, "translation" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "word"`);
  }
}
