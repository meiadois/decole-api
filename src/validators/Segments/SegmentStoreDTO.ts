import { IsString } from 'class-validator'

export interface SegmentStoreDTOI {
    name: string;
  }
export class SegmentStoreDTO implements SegmentStoreDTOI {
    @IsString()
    public name!: string;
}
