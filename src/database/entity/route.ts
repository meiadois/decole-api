import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, RelationId, ManyToMany, JoinTable} from "typeorm";
import { validateOrReject, IsString,  IsNumber } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";
import { Lesson } from "./lesson";

@Entity()
export class Route extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiProperty()
    @Column()
    @IsString()
    title: string;

    @ApiProperty()
    @Column()
    @IsString()
    description: string;

    @ApiProperty()
    @Column()
    @IsNumber()
    order: number;

    @RelationId((o: Route) => o.lessons)
    lessonIds?: string[];

    @ApiProperty({
        type: () => [Lesson]
    })
    @OneToMany(() => Lesson, o => o.route)
    lessons?: Lesson[];
    
    @RelationId((o: Route) => o.requiredRoutes)
    requiredRouteIds: string[];

    @ManyToMany(() => Route, o => o.routesWhereIsRequired)
    @JoinTable()
    requiredRoutes: Route[];

    @RelationId((o: Route) => o.routesWhereIsRequired)
    routeWhereIsRequiredIds: string[];

    @ManyToMany(() => Route, o => o.requiredRoutes)
    routesWhereIsRequired: Route[];


    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}