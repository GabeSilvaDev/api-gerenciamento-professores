import { MigrationInterface, QueryRunner } from "typeorm";

export class Atualizacaocreate1704935878312 implements MigrationInterface {
    name = 'Atualizacaocreate1704935878312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP FOREIGN KEY \`FK_65d07eaee14ea20ab04791cb555\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`aluno\` CHANGE \`professor_id\` \`professor_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`professor\` CHANGE \`foto_perfil\` \`foto_perfil\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD CONSTRAINT \`FK_65d07eaee14ea20ab04791cb555\` FOREIGN KEY (\`professor_id\`) REFERENCES \`professor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP FOREIGN KEY \`FK_65d07eaee14ea20ab04791cb555\``);
        await queryRunner.query(`ALTER TABLE \`professor\` CHANGE \`foto_perfil\` \`foto_perfil\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`aluno\` CHANGE \`professor_id\` \`professor_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD CONSTRAINT \`FK_65d07eaee14ea20ab04791cb555\` FOREIGN KEY (\`professor_id\`) REFERENCES \`professor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
