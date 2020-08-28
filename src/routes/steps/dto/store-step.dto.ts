import { validateOrReject, IsString,  IsNumber } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";


export class StoreStepDTO {

    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsNumber()
    order: number;

    @ApiProperty()
    @IsString()
    lessonId: string;

    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}