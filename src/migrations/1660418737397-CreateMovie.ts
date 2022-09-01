import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMovie1660418737397 implements MigrationInterface {
    name = 'CreateMovie1660418737397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`duration\` int NOT NULL, \`startDate\` date NOT NULL, \`genre\` text NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', \`icon\` varchar(255) NOT NULL, \`fullHdImage\` varchar(255) NOT NULL DEFAULT '', \`trailer\` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`movies\``);
    }

}
