import { Sequelize, Model, DataTypes } from 'sequelize'

export interface DoneLessonI {
  id?: number | null;
  user_id: number;
  lesson_id: number;
}
export class DoneLesson extends Model implements DoneLessonI {
  public id?: number;
  public lesson_id!: number;
  public user_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  DoneLesson.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      lesson_id: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'done_lessons',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  DoneLesson.belongsTo(sequelize.models.User, { foreignKey: 'user_id', as: 'user' })
  DoneLesson.belongsTo(sequelize.models.Lesson, { foreignKey: 'lesson_id', as: 'lesson' })
}
