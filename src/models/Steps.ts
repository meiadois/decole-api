import { Model, Table, PrimaryKey, Column, AllowNull, NotEmpty, AutoIncrement } from 'sequelize-typescript'

export interface StepI{
    id?: number | null;
    first_name: string;
    last_name: string;
    email: string;
    password;
}

@Table(
  {
    tableName: 'steps',
    timestamps: true
  }
)
export default class Step extends Model implements StepI {
    @AutoIncrement
    @PrimaryKey
    @Column
    @AllowNull(false)
    @NotEmpty
    id?: number | null;

    @Column
    @AllowNull(false)
    @NotEmpty
    first_name: string;

    @Column
    @AllowNull(false)
    @NotEmpty
    last_name: string;

    @Column
    @AllowNull(false)
    @NotEmpty
    email: string;

    @Column
    @AllowNull(false)
    @NotEmpty
    password;
}
