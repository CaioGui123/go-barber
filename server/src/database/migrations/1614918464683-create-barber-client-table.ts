import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBarberClientTable1614918464683
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'barber_client',
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
            name: 'scheduled_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'scheduled_to',
            type: 'datetime',
          },
          {
            name: 'is_cutted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_accepted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'price',
            type: 'decimal',
            scale: 2,
            precision: 4,
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
    await queryRunner.dropTable('barber_client');
  }
}
