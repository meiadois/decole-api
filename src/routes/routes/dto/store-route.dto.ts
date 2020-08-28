import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, validateOrReject, IsArray } from "class-validator";

export class StoreRouteDTO{

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
    @IsArray()
    @IsString({each: true})
    requiredRouteIds: string[];

    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}