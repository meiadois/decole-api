import { IsString, IsOptional, IsNumber } from 'class-validator'

export interface MeCompanyUpdateDTOI {
    id?: number | null;
    name: string;
    description: string;
    segment_id: number;
    cnpj: string;
    cellphone: string;
    email: string;
    cep: string;
    city: string;
    neighborhood: string;
    visible?: boolean;
  }
export default class MeCompanyUpdateDTO implements MeCompanyUpdateDTOI {
    @IsNumber()
    @IsOptional()
    public id?: number;

    @IsString()
    public name!: string;

    @IsString()
    public description!: string;

    @IsString()
    public segment_id!: number;

    @IsString()
    public cnpj!: string;

    @IsString()
    public cellphone!: string;

    @IsString()
    public email!: string;

    @IsString()
    public cep!: string;

    @IsString()
    public city!: string;

    @IsString()
    public neighborhood!: string;

    @IsString()
    @IsOptional()
    public visible?: boolean;
}
