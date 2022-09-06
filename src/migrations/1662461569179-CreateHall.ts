import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHall1662461569179 implements MigrationInterface {
    name = 'CreateHall1662461569179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hall_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`countPlace\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`countRow\` int NOT NULL, \`countPlaceInRow\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`icon\` \`icon\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`icon\` \`icon\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`hall_entity\``);
    }

}
