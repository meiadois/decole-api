import {MigrationInterface, QueryRunner} from "typeorm";

export class createRoutesLessonsSteps1598367276541 implements MigrationInterface {
    name = 'createRoutesLessonsSteps1598367276541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `route` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `order` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `step` (`id` varchar(36) NOT NULL, `message` varchar(255) NOT NULL, `order` int NOT NULL, `lessonId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lesson` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `order` int NOT NULL, `routeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `step` ADD CONSTRAINT `FK_3f4cb6fe244ff0714645ce3d6f8` FOREIGN KEY (`lessonId`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lesson` ADD CONSTRAINT `FK_d46208113b87fd550edcd8bb261` FOREIGN KEY (`routeId`) REFERENCES `route`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `lesson` DROP FOREIGN KEY `FK_d46208113b87fd550edcd8bb261`");
        await queryRunner.query("ALTER TABLE `step` DROP FOREIGN KEY `FK_3f4cb6fe244ff0714645ce3d6f8`");
        await queryRunner.query("DROP TABLE `lesson`");
        await queryRunner.query("DROP TABLE `step`");
        await queryRunner.query("DROP TABLE `route`");
    }

}
