import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenInvalido1704776599300 implements MigrationInterface {
    name = 'TokenInvalido1704776599300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`token_invalido\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`professor\` CHANGE \`foto_perfil\` \`foto_perfil\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP FOREIGN KEY \`FK_65d07eaee14ea20ab04791cb555\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` CHANGE \`professor_id\` \`professor_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD CONSTRAINT \`FK_65d07eaee14ea20ab04791cb555\` FOREIGN KEY (\`professor_id\`) REFERENCES \`professor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP FOREIGN KEY \`FK_65d07eaee14ea20ab04791cb555\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` CHANGE \`professor_id\` \`professor_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD CONSTRAINT \`FK_65d07eaee14ea20ab04791cb555\` FOREIGN KEY (\`professor_id\`) REFERENCES \`professor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`professor\` CHANGE \`foto_perfil\` \`foto_perfil\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`token_invalido\``);
    }

}
