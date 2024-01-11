import { MigrationInterface, QueryRunner } from "typeorm";

export class Awsfile1704935681723 implements MigrationInterface {
    name = 'Awsfile1704935681723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`file_name\` varchar(255) NOT NULL, \`content_length\` int NOT NULL, \`content_type\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_cd3d24adc04a5519083a7f82b4\` (\`file_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`DROP INDEX \`IDX_cd3d24adc04a5519083a7f82b4\` ON \`file\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
