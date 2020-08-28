import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, RelationId, JoinTable, ManyToMany} from "typeorm";
import { validateOrReject, IsString,  IsNumber } from 'class-validator'
import { Route } from "./route";
import { Step } from "./step";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Lesson extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @RelationId((o: Lesson) => o.route)
    routeId: string;

    @ApiProperty({
        type: () => Route
    })
    @ManyToOne(() => Route, o => o.lessons, { onDelete: 'CASCADE', cascade: true })
    route: Route;

    @RelationId((o: Lesson) => o.steps)
    stepIds: string[];

    @ApiProperty({
        type: () => [Step]
    })
    @OneToMany(() => Step, o => o.lesson)
    steps: Step[];


    @RelationId((o: Lesson) => o.requiredLessons)
    requiredLessonIds: string[];

    @ManyToMany(() => Lesson, o => o.lessonsWhereIsRequired)
    @JoinTable()
    requiredLessons: Lesson[];

    @RelationId((o: Lesson) => o.lessonsWhereIsRequired)
    lessonWhereIsRequiredIds: string[];

    @ManyToMany(() => Lesson, o => o.requiredLessons)
    lessonsWhereIsRequired: Lesson[];

    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}