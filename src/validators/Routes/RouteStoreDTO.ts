import { IsString } from 'class-validator'

export interface RouteStoreDTOI {
    title: string;
    description: string;
  }
export class RouteStoreDTO implements RouteStoreDTOI {
    @IsString()
    public title!: string;

    @IsString()
    public description!: string;
}
