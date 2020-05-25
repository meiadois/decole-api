import { IsInt, IsString } from 'class-validator'

export interface AccountUpdateDTOI {
    user_id: number;
    channel_name: string;
    username: string;
  }
export class AccountUpdateDTO implements AccountUpdateDTOI {
    @IsInt()
    public user_id!: number;

    @IsString()
    public channel_name!: string;

    @IsString()
    public username!: string;
}
