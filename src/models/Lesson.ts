import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin, BelongsToManyCreateAssociationMixin, BelongsToManyCountAssociationsMixin } from 'sequelize'
import { Route } from './Route'
import { Channel } from './Channel'
import { Step } from './Step'
import { LessonRequirement } from './LessonRequirement'
import { DoneLesson } from './DoneLesson'

export interface LessonI {
  id?: number | null;
  title: string;
  description: string;
  order: number;
  route_id: number;
  done: boolean;

}
export class Lesson extends Model implements LessonI {
  public id?: number;
  public title!: string;
  public description!: string;
  public order!: number;
  public route_id!: number;
  public done!: boolean;

  // Removendo N x N
  /*
  public getRoutes!: BelongsToManyGetAssociationsMixin<Route>; // Note the null assertions!
  public addRoute!: BelongsToManyAddAssociationMixin<Route, number>;
  public hasRoute!: BelongsToManyHasAssociationMixin<Route, number>;
  public countRoutes!: BelongsToManyCountAssociationsMixin;
  public createRoute!: BelongsToManyCreateAssociationMixin<Route>;
*/
  public getChannels!: BelongsToManyGetAssociationsMixin<Channel>; // Note the null assertions!
  public addChannel!: BelongsToManyAddAssociationMixin<Channel, number>;
  public hasChannel!: BelongsToManyHasAssociationMixin<Channel, number>;
  public countChannels!: BelongsToManyCountAssociationsMixin;
  public createChannel!: BelongsToManyCreateAssociationMixin<Channel>;

  public getSteps!: HasManyGetAssociationsMixin<Step>; // Note the null assertions!
  public addStep!: HasManyAddAssociationMixin<Step, number>;
  public hasStep!: HasManyHasAssociationMixin<Step, number>;
  public countSteps!: HasManyCountAssociationsMixin;
  public createStep!: HasManyCreateAssociationMixin<Step>;

  public getLessonRequirements!: HasManyGetAssociationsMixin<LessonRequirement>; // Note the null assertions!
  public addLessonRequirement!: HasManyAddAssociationMixin<LessonRequirement, number>;
  public hasLessonRequirement!: HasManyHasAssociationMixin<LessonRequirement, number>;
  public countLessonRequirements!: HasManyCountAssociationsMixin;
  public createLessonRequirement!: HasManyCreateAssociationMixin<LessonRequirement>;

  public getBelongsToLessonRequirements!: HasManyGetAssociationsMixin<LessonRequirement>; // Note the null assertions!
  public addBelongsToLessonRequirement!: HasManyAddAssociationMixin<LessonRequirement, number>;
  public hasBelongsToLessonRequirement!: HasManyHasAssociationMixin<LessonRequirement, number>;
  public countBelongsToLessonRequirements!: HasManyCountAssociationsMixin;
  public createBelongsToLessonRequirement!: HasManyCreateAssociationMixin<LessonRequirement>;

  public getDoneLessons!: HasManyGetAssociationsMixin<DoneLesson>; // Note the null assertions!
  public addDoneLesson!: HasManyAddAssociationMixin<DoneLesson, number>;
  public hasDoneLesson!: HasManyHasAssociationMixin<DoneLesson, number>;
  public countDoneLessons!: HasManyCountAssociationsMixin;
  public createDoneLesson!: HasManyCreateAssociationMixin<DoneLesson>;

  // public readonly routes?: Route[]; // Removendo N x N
  public readonly channels?: Channel[];
  public readonly steps?: Step[];
  public readonly requirements?: LessonRequirement[];
  public readonly belongs_to_requirements?: LessonRequirement[];
  public readonly done_lessons?: DoneLesson[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    // routes: Association<Lesson, Route>;// Removendo N x N
    channels: Association<Lesson, Channel>;
    steps: Association<Lesson, Step>;
    requirements: Association<Lesson, LessonRequirement>;
    belongs_to_requirements: Association<Lesson, LessonRequirement>;
    done_lessons: Association<Lesson, DoneLesson>;
  };
}
export function init (sequelize: Sequelize): void {
  Lesson.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      route_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      done: {
        type: DataTypes.VIRTUAL
      }
    },
    {
      tableName: 'lessons',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  // Lesson.belongsToMany(sequelize.models.Route, { foreignKey: 'lesson_id', through: 'route_lessons', as: 'routes' })
  Lesson.belongsTo(sequelize.models.Route, { foreignKey: 'route_id', as: 'route' })
  Lesson.belongsToMany(sequelize.models.Channel, { foreignKey: 'lesson_id', through: 'channel_lessons', as: 'channels' })
  Lesson.hasMany(sequelize.models.Step, { foreignKey: 'lesson_id', as: 'steps' })
  Lesson.hasMany(sequelize.models.LessonRequirement, { foreignKey: 'required_lesson_id', as: 'belongs_to_requirements' })
  Lesson.hasMany(sequelize.models.LessonRequirement, { foreignKey: 'lesson_id', as: 'requirements' })
  Lesson.hasMany(sequelize.models.DoneLesson, { foreignKey: 'lesson_id', as: 'done_lessons' })
}
