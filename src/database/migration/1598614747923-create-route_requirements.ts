import {MigrationInterface, QueryRunner} from "typeorm";

export class createRouteRequirements1598614747923 implements MigrationInterface {
    name = 'createRouteRequirements1598614747923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `route_required_routes_route` (`routeId_1` varchar(36) NOT NULL, `routeId_2` varchar(36) NOT NULL, INDEX `IDX_2109cf5b7c88f400d102ed6d43` (`routeId_1`), INDEX `IDX_359d95f8e314bc451c82f495dd` (`routeId_2`), PRIMARY KEY (`routeId_1`, `routeId_2`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `route_required_routes_route` ADD CONSTRAINT `FK_2109cf5b7c88f400d102ed6d434` FOREIGN KEY (`routeId_1`) REFERENCES `route`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `route_required_routes_route` ADD CONSTRAINT `FK_359d95f8e314bc451c82f495dd3` FOREIGN KEY (`routeId_2`) REFERENCES `route`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `route_required_routes_route` DROP FOREIGN KEY `FK_359d95f8e314bc451c82f495dd3`");
        await queryRunner.query("ALTER TABLE `route_required_routes_route` DROP FOREIGN KEY `FK_2109cf5b7c88f400d102ed6d434`");
        await queryRunner.query("DROP INDEX `IDX_359d95f8e314bc451c82f495dd` ON `route_required_routes_route`");
        await queryRunner.query("DROP INDEX `IDX_2109cf5b7c88f400d102ed6d43` ON `route_required_routes_route`");
        await queryRunner.query("DROP TABLE `route_required_routes_route`");
    }

}
