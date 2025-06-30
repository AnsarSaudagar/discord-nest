import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrganizationsTable1751306629825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'organizations',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'owner_id',
                        type: 'int',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'allow_public_join',
                        type: 'boolean',
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: 'require_approval',
                        type: 'boolean',
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                ],
                indices: [
                    {
                        name: 'IDX_ORGANIZATIONS_OWNER_ID',
                        columnNames: ['owner_id'],
                    },
                    {
                        name: 'IDX_ORGANIZATIONS_NAME',
                        columnNames: ['name'],
                    },
                ],
            }),
            true,
        );

        // Add foreign key constraint
        await queryRunner.createForeignKey(
            'organizations',
            new TableForeignKey({
                name: 'FK_ORGANIZATIONS_OWNER',
                columnNames: ['owner_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('organizations');
    }

}
