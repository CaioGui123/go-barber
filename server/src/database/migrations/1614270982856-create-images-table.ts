import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImagesTable1614270982856 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true, // Valores positivos
            isPrimary: true,
            isGenerated: true, // Gerada automaticamente...
            generationStrategy: 'increment', // De maneira incremental...
          },
          {
            name: 'path',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
