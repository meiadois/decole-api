import { IsString, IsInt, IsDate, IsOptional, IsBoolean, IsEmail } from 'class-validator'

export interface UserStoreDTOI {
    id?: number | null;
    name: string;
    email: string;
    password: string;
    introduced: boolean;
    paid_access_expiration: Date;
  }
export class UserStoreDTO implements UserStoreDTOI {
    @IsInt()
    @IsOptional()
    public id?: number | null;

    @IsString()
    public name!: string;

    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;

    @IsBoolean()
    public introduced!: boolean;

    @IsDate()
    public paid_access_expiration!: Date;
}
