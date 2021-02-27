import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBarberImageTable1614360814157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'barber_image',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'barber_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'BarberImage',
            columnNames: ['barber_id'],
            referencedTableName: 'barbers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('barber_image');
  }
}
