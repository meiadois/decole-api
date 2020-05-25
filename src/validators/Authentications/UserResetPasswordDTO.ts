import { IsEmail } from 'class-validator'

export interface UserResetPasswordDTOI {
    email: string;
  }
export class UserResetPasswordDTO implements UserResetPasswordDTOI {
    @IsEmail()
    public email!: string;
}
