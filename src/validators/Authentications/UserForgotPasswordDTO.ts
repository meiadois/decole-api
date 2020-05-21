import { IsString } from 'class-validator'

export interface UserForgotPasswordDTOI {
    token: string;
    password: string;
  }
export class UserForgotPasswordDTO implements UserForgotPasswordDTOI {
    @IsString()
    public token!: string;

    @IsString()
    public password!: string;
}
