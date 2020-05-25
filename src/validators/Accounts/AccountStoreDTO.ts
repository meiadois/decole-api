import { IsInt, IsString } from 'class-validator'

export interface AccountStoreDTOI {
    user_id: number;
    channel_name: string;
    username: string;
  }
export class AccountStoreDTO implements AccountStoreDTOI {
    @IsInt()
    public user_id!: number;

    @IsString()
    public channel_name!: string;

    @IsString()
    public username!: string;
}
