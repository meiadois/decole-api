import { IsString, IsInt } from 'class-validator'

export interface StepStoreDTOI {
    message: string;
    lesson_id: number;
    order: number;
  }
export class StepStoreDTO implements StepStoreDTOI {
    @IsString()
    public message!: string;

    @IsInt()
    public lesson_id!: number;

    @IsInt()
    public order!: number;
}
