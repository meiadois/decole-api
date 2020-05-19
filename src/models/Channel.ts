import { Sequelize, Model, DataTypes, BuildOptions, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin, Association, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'
import { Lesson } from './Lesson'
import { Route } from './Route'
import { Account } from './Account'

export interface ChannelI {
  id?: number | null;
  name: string;
  category: string;
}
export class Channel extends Model implements ChannelI {
  public id?: number;
  public name!: string;
  public category!: string;

  public getLessons!: BelongsToManyGetAssociationsMixin<Lesson>; // Note the null assertions!
  public addLesson!: BelongsToManyAddAssociationMixin<Lesson, number>;
  public hasLesson!: BelongsToManyHasAssociationMixin<Lesson, number>;
  public countLessons!: BelongsToManyCountAssociationsMixin;
  public createLesson!: BelongsToManyCreateAssociationMixin<Lesson>;

  public getRoutes!: BelongsToManyGetAssociationsMixin<Route>; // Note the null assertions!
  public addRoute!: BelongsToManyAddAssociationMixin<Route, number>;
  public hasRoute!: BelongsToManyHasAssociationMixin<Route, number>;
  public countRoutes!: BelongsToManyCountAssociationsMixin;
  public createRoute!: BelongsToManyCreateAssociationMixin<Route>;

  public getAccounts!: HasManyGetAssociationsMixin<Account>; // Note the null assertions!
  public addAccount!: HasManyAddAssociationMixin<Account, number>;
  public hasAccount!: HasManyHasAssociationMixin<Account, number>;
  public countAccounts!: HasManyCountAssociationsMixin;
  public createAccount!: HasManyCreateAssociationMixin<Account>;

  public readonly lessons?: Lesson[];
  public readonly routes?: Route[];
  public readonly accounts?: Account[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    lessons: Association<Channel, Lesson>;
    routes: Association<Channel, Route>;
    accounts: Association<Channel, Account>;
  };
}
export function init (sequelize: Sequelize): void {
  Channel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      }
      // Colocar usuário
    },
    {
      tableName: 'channels',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  Channel.belongsToMany(sequelize.models.Lesson, { foreignKey: 'channel_id', through: 'channel_lessons', as: 'lessons' })
  Channel.belongsToMany(sequelize.models.Route, { foreignKey: 'channel_id', through: 'channel_routes', as: 'routes' })
  Channel.hasMany(Account, { foreignKey: 'channel_id', as: 'accounts' })
}
