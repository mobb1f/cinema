import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateHall1662461799602 implements MigrationInterface {
    name = 'UpdateHall1662461799602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hall_entity\` CHANGE \`image\` \`image\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hall_entity\` CHANGE \`image\` \`image\` varchar(255) NOT NULL`);
    }

}
