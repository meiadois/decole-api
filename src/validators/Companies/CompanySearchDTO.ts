import { IsString, IsInt, IsOptional, IsEmail } from 'class-validator'

export interface CompanySearchDTOI {
    limit: number;
    offset: number;
    name: string;
    segment_id: number;
    cnpj: string;
    cellphone: string;
    email: string;
    cep: string;
    city: string;
    neighborhood: string;
  }
export default class CompanySearchDTO implements CompanySearchDTOI {
    @IsInt()
    @IsOptional()
    public limit: number;

    @IsInt()
    @IsOptional()
    public offset: number;

    @IsString()
    @IsOptional()
    public name!: string;

    @IsInt()
    @IsOptional()
    public segment_id!: number;

    @IsString()
    @IsOptional()
    public cnpj!: string;

    @IsString()
    @IsOptional()
    public cellphone!: string;

    @IsEmail()
    @IsOptional()
    public email!: string;

    @IsString()
    @IsOptional()
    public cep!: string;

    @IsString()
    @IsOptional()
    public city!: string;

    @IsString()
    @IsOptional()
    public neighborhood!: string;
}
