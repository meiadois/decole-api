import { IsString } from 'class-validator'

export interface AccountMeStoreDTOI {
    channel_name: string;
    username: string;
  }
export class AccountMeStoreDTO implements AccountMeStoreDTOI {
    @IsString()
    public channel_name!: string;

    @IsString()
    public username!: string;
}
