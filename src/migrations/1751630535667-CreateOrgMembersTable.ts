import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrgMembersTable1751630535667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'org_members',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'organization_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'role',
                        type: 'int',
                        default: 1, // MemberRole.MEMBER
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'int',
                        default: 1, // MemberStatus.ACTIVE
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
                        name: 'IDX_ORG_MEMBERS_USER_ID',
                        columnNames: ['user_id'],
                    },
                    {
                        name: 'IDX_ORG_MEMBERS_ORGANIZATION_ID',
                        columnNames: ['organization_id'],
                    },
                    {
                        name: 'IDX_ORG_MEMBERS_USER_ORG',
                        columnNames: ['user_id', 'organization_id'],
                        isUnique: true, // Prevent duplicate memberships
                    },
                ],
            }),
            true,
        );

        // Add foreign key constraint for user_id
        await queryRunner.createForeignKey(
            'org_members',
            new TableForeignKey({
                name: 'FK_ORG_MEMBERS_USER',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        // Add foreign key constraint for organization_id
        await queryRunner.createForeignKey(
            'org_members',
            new TableForeignKey({
                name: 'FK_ORG_MEMBERS_ORGANIZATION',
                columnNames: ['organization_id'],
                referencedTableName: 'organizations',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys first, then the table
        // await queryRunner.dropForeignKey('org_members', 'FK_ORG_MEMBERS_USER');
        // await queryRunner.dropForeignKey('org_members', 'FK_ORG_MEMBERS_ORGANIZATION');
        await queryRunner.dropTable('org_members');
    }

}
