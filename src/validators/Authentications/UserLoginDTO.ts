import { IsString, IsEmail } from 'class-validator'

export interface UserLoginDTOI {
    email: string;
    password: string;
  }
export class UserLoginDTO implements UserLoginDTOI {
    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;
}
