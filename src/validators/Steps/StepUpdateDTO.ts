import { IsString, IsInt } from 'class-validator'

export interface StepUpdateDTOI {
    message: string;
    lesson_id: number;
    order: number;
  }
export class StepUpdateDTO implements StepUpdateDTOI {
    @IsString()
    public message!: string;

    @IsInt()
    public lesson_id!: number;

    @IsInt()
    public order!: number;
}
