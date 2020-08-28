export interface JwtPayloadI {
    sub: string;
    email: string;
    name: string;
}
export class JwtPayload {
    sub: string;
    email: string;
    name: string;
}


export interface JwtUserI {
    id: string;
    email: string;
    name: string;
}

export interface LoginInfosI {
    accessToken: string;
    refreshToken: string;
}
export class LoginInfos {
    accessToken: string;
    refreshToken: string;
}