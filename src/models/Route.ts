import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, HasManyRemoveAssociationMixin } from 'sequelize'
import { Channel } from './Channel'
import User from './User'
import { Lesson } from './Lesson'
import { RouteRequirement } from './RouteRequirement'
import { DoneRoute } from './DoneRoute'

export interface RouteI {
  id?: number | null;
  title: string;
  description: string;
}
export class Route extends Model implements RouteI {
  public id?: number;
  public title!: string;
  public description!: string;

  public getLessons!: HasManyGetAssociationsMixin<Lesson>; // Note the null assertions!
  public addLesson!: HasManyAddAssociationMixin<Lesson, number>;
  public hasLesson!: HasManyHasAssociationMixin<Lesson, number>;
  public removeLesson!: HasManyRemoveAssociationMixin<Lesson, number>;
  public countLessons!: HasManyCountAssociationsMixin;
  public createLesson!: HasManyCreateAssociationMixin<Lesson>;

  public getUsers!: BelongsToManyGetAssociationsMixin<User>; // Note the null assertions!
  public addUser!: BelongsToManyAddAssociationMixin<User, number>;
  public hasUser!: BelongsToManyHasAssociationMixin<User, number>;
  public removeUser!: HasManyRemoveAssociationMixin<User, number>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
  public createUser!: BelongsToManyCreateAssociationMixin<User>;

  public getChannels!: BelongsToManyGetAssociationsMixin<Channel>; // Note the null assertions!
  public addChannel!: BelongsToManyAddAssociationMixin<Channel, number>;
  public hasChannel!: BelongsToManyHasAssociationMixin<Channel, number>;
  public removeChannel!: HasManyRemoveAssociationMixin<Channel, number>;
  public countChannels!: BelongsToManyCountAssociationsMixin;
  public createChannel!: BelongsToManyCreateAssociationMixin<Channel>;

  public getRouteRequirements!: HasManyGetAssociationsMixin<RouteRequirement>; // Note the null assertions!
  public addRouteRequirement!: HasManyAddAssociationMixin<RouteRequirement, number>;
  public hasRouteRequirement!: HasManyHasAssociationMixin<RouteRequirement, number>;
  public removeRouteRequirement!: HasManyRemoveAssociationMixin<RouteRequirement, number>;
  public countRouteRequirements!: HasManyCountAssociationsMixin;
  public createRouteRequirement!: HasManyCreateAssociationMixin<RouteRequirement>;

  public getBelongsToRouteRequirements!: HasManyGetAssociationsMixin<RouteRequirement>; // Note the null assertions!
  public addBelongsToRouteRequirement!: HasManyAddAssociationMixin<RouteRequirement, number>;
  public hasBelongsToRouteRequirement!: HasManyHasAssociationMixin<RouteRequirement, number>;
  public removeBelongsToRouteRequirement!: HasManyRemoveAssociationMixin<RouteRequirement, number>;
  public countBelongsToRouteRequirements!: HasManyCountAssociationsMixin;
  public createBelongsToRouteRequirement!: HasManyCreateAssociationMixin<RouteRequirement>;

  public getDoneRoutes!: HasManyGetAssociationsMixin<DoneRoute>; // Note the null assertions!
  public addDoneRoute!: HasManyAddAssociationMixin<DoneRoute, number>;
  public hasDoneRoute!: HasManyHasAssociationMixin<DoneRoute, number>;
  public removeDoneRoute!: HasManyRemoveAssociationMixin<DoneRoute, number>;
  public countDoneRoutes!: HasManyCountAssociationsMixin;
  public createDoneRoute!: HasManyCreateAssociationMixin<DoneRoute>;

  public readonly users?: User[];
  public readonly channels?: Channel[];
  public readonly lessons?: Lesson[];
  public readonly route_requirements?: RouteRequirement[];
  public readonly belongs_to_requirements?: RouteRequirement[];
  public readonly done_routes?: DoneRoute[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    users: Association<Route, User>;
    channels: Association<Route, Channel>;
    lessons: Association<Route, Lesson>;
    route_requirements: Association<Route, RouteRequirement>;
    belongs_to_requirements: Association<Route, RouteRequirement>;
    done_routes: Association<Route, DoneRoute>;
  };
}
export function init (sequelize: Sequelize): void {
  Route.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'routes',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  // Route.belongsToMany(sequelize.models.Lesson, { foreignKey: 'route_id', through: 'route_lessons', as: 'lessons' })
  Route.hasMany(sequelize.models.Lesson, { foreignKey: 'route_id', as: 'lessons' })
  Route.belongsToMany(sequelize.models.User, { foreignKey: 'route_id', through: 'user_routes', as: 'users' })
  Route.belongsToMany(sequelize.models.Channel, { foreignKey: 'route_id', through: 'channel_routes', as: 'channels' })
  Route.hasMany(sequelize.models.DoneRoute, { foreignKey: 'route_id', as: 'done_routes' })
  Route.hasMany(sequelize.models.RouteRequirement, { foreignKey: 'required_route_id', as: 'belongs_to_required_routes' })
  Route.hasMany(sequelize.models.RouteRequirement, { foreignKey: 'route_id', as: 'route_requirements' })
}
