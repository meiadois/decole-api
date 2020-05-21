import { IsString } from 'class-validator'

export interface SegmentUpdateDTOI {
    name: string;
  }
export class SegmentUpdateDTO implements SegmentUpdateDTOI {
    @IsString()
    public name!: string;
}
