import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRatingTable1615612235816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rating',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'barber_id',
            type: 'integer',
          },
          {
            name: 'client_id',
            type: 'integer',
          },
          {
            name: 'stars',
            type: 'integer',
            default: 0,
          },
          {
            name: 'body',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'Barber',
            columnNames: ['barber_id'],
            referencedTableName: 'barbers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'Client',
            columnNames: ['client_id'],
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rating');
  }
}
