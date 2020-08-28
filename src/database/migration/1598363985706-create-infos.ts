import {MigrationInterface, QueryRunner} from "typeorm";

export class createInfos1598363985706 implements MigrationInterface {
    name = 'createInfos1598363985706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `info` (`name` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `info`");
    }

}
