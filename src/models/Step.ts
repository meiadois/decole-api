import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface StepI {
  id?: number | null;
  lesson_id: number;
  message: string;
  order: number;
}
export class Step extends Model implements StepI {
  public id?: number;
  public message!: string;
  public order!: number;
  public lesson_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  Step.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      lesson_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
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

export function associate (sequelize: Sequelize): void {
  Step.belongsTo(sequelize.models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' })
}
