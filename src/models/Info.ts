import { Model, DataTypes, Sequelize } from "sequelize/types";

export interface InfoI {
    name: string;
    value: string;
}

export class Info extends Model implements InfoI {
    public name!: string;
    public value!: string;


    public static associations: {}
}

export function init (sequelize: Sequelize): void {
    Info.init(
        {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
          },
          value: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
        {
          tableName: 'infos',
          sequelize: sequelize // this bit is important
        }
      )
}

export function associate (sequelize: Sequelize): void {}