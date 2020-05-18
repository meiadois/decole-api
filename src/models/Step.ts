import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface StepI {
  id?: number | null;
  message: string;
  order: number;
}
export class Step extends Model implements StepI {
  public id?: number;
  public message!: string;
  public order!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function initStep (sequelize: Sequelize): void {
  Step.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'steps',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associateStep (): void {
  console.log('Step dont have associations')
}
