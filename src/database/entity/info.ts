import {Entity, Column, BaseEntity, PrimaryColumn} from "typeorm";
import { validateOrReject, IsString } from 'class-validator'

@Entity()
export class Info extends BaseEntity {

    @PrimaryColumn()
    @IsString()
    name: string;

    @Column()
    @IsString()
    value: string;

    async validate (): Promise<void> {
        await validateOrReject(this)
    }
}