import { validateOrReject, IsString,  IsNumber, IsArray} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";


export class UpdateLessonDTO {
    
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
    @IsArray()
    @IsString({each: true})
    stepIds: string[];


    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    requiredLessonIds: string[];

    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}