import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSession1662545803404 implements MigrationInterface {
    name = 'CreateSession1662545803404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`datetime\` datetime NOT NULL, \`price\` int NOT NULL, \`movieId\` int NULL, \`hallId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hall\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`countPlace\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL DEFAULT '', \`countRow\` int NOT NULL, \`countPlaceInRow\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_f056a463749c7b7b6700511bed7\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_9af3916ca4424685ada4c823a39\` FOREIGN KEY (\`hallId\`) REFERENCES \`hall\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_9af3916ca4424685ada4c823a39\``);
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_f056a463749c7b7b6700511bed7\``);
        await queryRunner.query(`DROP TABLE \`hall\``);
        await queryRunner.query(`DROP TABLE \`session\``);
    }

}
