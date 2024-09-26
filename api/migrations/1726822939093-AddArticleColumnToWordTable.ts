import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArticleColumnToWordTable1726822939093
  implements MigrationInterface
{
  name = 'AddArticleColumnToWordTable1726822939093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "word" ADD "article" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "article"`);
  }
}
