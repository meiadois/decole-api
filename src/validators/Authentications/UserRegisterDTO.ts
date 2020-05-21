import { IsString, IsEmail } from 'class-validator'

export interface UserRegisterDTOI {
    name: string;
    email: string;
    password: string;
  }
export class UserRegisterDTO implements UserRegisterDTOI {
    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;

    @IsString()
    public name!: string;
}
