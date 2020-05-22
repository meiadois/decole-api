import { IsInt } from 'class-validator'

export interface LikeStoreDTOI {
    sender_id: number;
    recipient_id: number;
  }
export class LikeStoreDTO implements LikeStoreDTOI {
    @IsInt()
    public sender_id!: number;

    @IsInt()
    public recipient_id!: number;
}
