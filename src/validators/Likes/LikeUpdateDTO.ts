import { IsInt, IsString } from 'class-validator'

export interface LikeUpdateDTOI {
    sender_id: number;
    recipient_id: number;
    status: string;
  }
export class LikeUpdateDTO implements LikeUpdateDTOI {
    @IsInt()
    public sender_id!: number;

    @IsInt()
    public recipient_id!: number;

    @IsString()
    public status!: string;
}
