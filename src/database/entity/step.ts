import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,  ManyToOne, RelationId} from "typeorm";
import { validateOrReject, IsString,  IsNumber } from 'class-validator'
import { Lesson } from "./lesson";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Step extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    @IsString()
    message: string;

    @ApiProperty()
    @Column()
    @IsNumber()
    order: number;

    @RelationId((o: Step) => o.lesson)
    lessonId: string;

    @ApiProperty({
        type: () => Lesson
    })
    @ManyToOne(() => Lesson, o => o.steps, { onDelete: 'CASCADE', cascade: true })
    lesson: Lesson;
    
    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}