import { IsString } from 'class-validator'

export interface RouteUpdateDTOI {
    title: string;
    description: string;
  }
export class RouteUpdateDTO implements RouteUpdateDTOI {
    @IsString()
    public title!: string;

    @IsString()
    public description!: string;
}
