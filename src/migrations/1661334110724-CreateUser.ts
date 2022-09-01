import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1661334110724 implements MigrationInterface {
    name = 'CreateUser1661334110724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`admin\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
