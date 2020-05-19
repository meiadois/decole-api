import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface LessonRequirementI {
  id?: number | null;
  required_lesson_id: number;
  lesson_id: number;
  required_step_id: number;
}
export class LessonRequirement extends Model implements LessonRequirementI {
  public id?: number;
  public required_lesson_id!: number;
  public lesson_id!: number;
  public required_step_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  LessonRequirement.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      required_lesson_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      lesson_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      required_step_id: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'lesson_requirements',
      sequelize: sequelize // LessonRequirement bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  LessonRequirement.belongsTo(sequelize.models.Lesson, { foreignKey: 'required_lesson_id', as: 'required_lesson' })
  LessonRequirement.belongsTo(sequelize.models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' })
  LessonRequirement.belongsTo(sequelize.models.Step, { foreignKey: 'required_step_id', as: 'required_step' })
}
