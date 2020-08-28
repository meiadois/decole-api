import { validateOrReject, IsString,  IsNumber, IsArray, IsOptional} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { Step } from '@/database/entity/step';


export class StoreLessonDTO {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    order: number;

    @ApiProperty()
    @IsString()
    routeId: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    stepIds: string[];

    @ApiProperty({
        type: () => [Step]
    })
    @IsOptional()
    @IsArray()
    @Type(() => Step)
    steps: Step[]


    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    requiredLessonIds: string[];

    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}