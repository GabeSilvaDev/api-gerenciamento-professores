import { MigrationInterface, QueryRunner } from 'typeorm';

export class Professores1702321864083 implements MigrationInterface {
  name = 'Professores1702321864083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`professor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`idade\` int NOT NULL, \`descricao\` text NOT NULL, \`valor_hora\` decimal(5,2) NOT NULL, \`foto_perfil\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`professor\``);
  }
}
