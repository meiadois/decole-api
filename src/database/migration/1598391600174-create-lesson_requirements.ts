import {MigrationInterface, QueryRunner} from "typeorm";

export class createLessonRequirements1598391600174 implements MigrationInterface {
    name = 'createLessonRequirements1598391600174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `lesson_required_lessons_lesson` (`lessonId_1` varchar(36) NOT NULL, `lessonId_2` varchar(36) NOT NULL, INDEX `IDX_a886cbf073b08888c46bc9d9a1` (`lessonId_1`), INDEX `IDX_5d5cbe47f4b2417702dcf6ab9e` (`lessonId_2`), PRIMARY KEY (`lessonId_1`, `lessonId_2`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` ADD CONSTRAINT `FK_a886cbf073b08888c46bc9d9a12` FOREIGN KEY (`lessonId_1`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` ADD CONSTRAINT `FK_5d5cbe47f4b2417702dcf6ab9e2` FOREIGN KEY (`lessonId_2`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` DROP FOREIGN KEY `FK_5d5cbe47f4b2417702dcf6ab9e2`");
        await queryRunner.query("ALTER TABLE `lesson_required_lessons_lesson` DROP FOREIGN KEY `FK_a886cbf073b08888c46bc9d9a12`");
        await queryRunner.query("DROP INDEX `IDX_5d5cbe47f4b2417702dcf6ab9e` ON `lesson_required_lessons_lesson`");
        await queryRunner.query("DROP INDEX `IDX_a886cbf073b08888c46bc9d9a1` ON `lesson_required_lessons_lesson`");
        await queryRunner.query("DROP TABLE `lesson_required_lessons_lesson`");
    }

}
