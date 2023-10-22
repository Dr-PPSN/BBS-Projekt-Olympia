import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1697980822131 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE nutzer
        ALTER COLUMN id TYPE VARCHAR(36),
        RENAME COLUMN id TO uuid;
      `,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE nutzer
        ALTER COLUMN uuid TYPE INT,
        RENAME COLUMN uuid TO id;
      `,
		);
	}
}
