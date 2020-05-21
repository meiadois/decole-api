import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator'

export interface CompanyUpdateDTOI {
    id?: number | null;
    name: string;
    description: string;
    segment_id: number;
    cnpj: string;
    cellphone: string;
    email: string;
    thumbnail?: string;
    banner?: string;
    cep: string;
    city: string;
    neighborhood: string;
    visible?: boolean;
  }
export default class CompanyUpdateDTO implements CompanyUpdateDTOI {
    public id?: number;
    @IsString()
    public name!: string;

    @IsString()
    public description!: string;

    @IsInt()
    public segment_id!: number;

    @IsString()
    public cnpj!: string;

    @IsString()
    public cellphone!: string;

    @IsString()
    public email!: string;

    @IsString()
    @IsOptional()
    public thumbnail?: string;

    @IsString()
    @IsOptional()
    public banner?: string;

    @IsString()
    public cep!: string;

    @IsString()
    public city!: string;

    @IsString()
    public neighborhood!: string;

    @IsBoolean()
    @IsOptional()
    public visible?: boolean;
}
