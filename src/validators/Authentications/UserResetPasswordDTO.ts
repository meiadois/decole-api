import { IsString, IsEmail } from 'class-validator'

export interface UserResetPasswordDTOI {
    name: string;
    email: string;
    password: string;
  }
export class UserResetPasswordDTO implements UserResetPasswordDTOI {
    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;

    @IsString()
    public name!: string;
}
