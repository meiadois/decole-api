import { Sequelize, Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin, HasManyRemoveAssociationMixin } from 'sequelize'
import { Route } from './Route'
import { Company } from './Company'
import { Account } from './Account'

import { DoneRoute } from './DoneRoute'
import { DoneLesson } from './DoneLesson'
import { Payment } from './Payment'

export interface UserI {
  id?: number | null;
  name: string;
  email: string;
  password: string;
  introduced: boolean;
  paid_access_expiration: Date;
}
export class User extends Model implements UserI {
  public id?: number | null;
  public name!: string;
  public email!: string;
  public password!: string;
  public introduced!: boolean;
  public paid_access_expiration!: Date;

  public getRoutes!: BelongsToManyGetAssociationsMixin<Route>; // Note the null assertions!
  public addRoute!: BelongsToManyAddAssociationMixin<Route, number>;
  public hasRoute!: BelongsToManyHasAssociationMixin<Route, number>;
  public removeRoute!: HasManyRemoveAssociationMixin<Route, number>;
  public countRoutes!: BelongsToManyCountAssociationsMixin;
  public createRoute!: BelongsToManyCreateAssociationMixin<Route>;

  public getCompanies!: BelongsToManyGetAssociationsMixin<Company>; // Note the null assertions!
  public addCompany!: BelongsToManyAddAssociationMixin<Company, number>;
  public hasCompany!: BelongsToManyHasAssociationMixin<Company, number>;
  public removeCompany!: HasManyRemoveAssociationMixin<Company, number>;
  public countCompanies!: BelongsToManyCountAssociationsMixin;
  public createCompany!: BelongsToManyCreateAssociationMixin<Company>;

  public getDoneRoutes!: HasManyGetAssociationsMixin<DoneRoute>; // Note the null assertions!
  public addDoneRoute!: HasManyAddAssociationMixin<DoneRoute, number>;
  public hasDoneRoute!: HasManyHasAssociationMixin<DoneRoute, number>;
  public removeDoneRoute!: HasManyRemoveAssociationMixin<DoneRoute, number>;
  public countDoneRoutes!: HasManyCountAssociationsMixin;
  public createDoneRoute!: HasManyCreateAssociationMixin<DoneRoute>;

  public getDoneLessons!: HasManyGetAssociationsMixin<DoneLesson>; // Note the null assertions!
  public addDoneLesson!: HasManyAddAssociationMixin<DoneLesson, number>;
  public hasDoneLesson!: HasManyHasAssociationMixin<DoneLesson, number>;
  public removeDoneLesson!: HasManyRemoveAssociationMixin<DoneLesson, number>;

  public countDoneLessons!: HasManyCountAssociationsMixin;
  public createDoneLesson!: HasManyCreateAssociationMixin<DoneLesson>;

  public getAccounts!: HasManyGetAssociationsMixin<Account>; // Note the null assertions!
  public addAccount!: HasManyAddAssociationMixin<Account, number>;
  public hasAccount!: HasManyHasAssociationMixin<Account, number>;
  public removeAccount!: HasManyRemoveAssociationMixin<Account, number>;
  public countAccounts!: HasManyCountAssociationsMixin;
  public createAccount!: HasManyCreateAssociationMixin<Account>;

  public getPayments!: HasManyGetAssociationsMixin<Payment>; // Note the null assertions!
  public addPayment!: HasManyAddAssociationMixin<Payment, number>;
  public hasPayment!: HasManyHasAssociationMixin<Payment, number>;
  public removePayment!: HasManyRemoveAssociationMixin<Payment, number>;
  public countPayments!: HasManyCountAssociationsMixin;
  public createPayment!: HasManyCreateAssociationMixin<Payment>;

  public readonly routes?: Route[];
  public readonly companies?: Company[];
  public readonly done_routes?: DoneRoute[];
  public readonly done_lessons?: DoneLesson[];
  public readonly accounts?: Account[];
  public readonly payments?: Payment[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    routes: Association<User, Route>;
    companies: Association<User, Company>;
    done_routes: Association<User, DoneRoute>;
    done_lessons: Association<User, DoneLesson>;
    accounts: Association<User, Account>;
    payments: Association<User, Payment>;

  };
}
export function init (sequelize: Sequelize): void {
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      introduced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      paid_access_expiration: {
        type: DataTypes.DATE,
        allowNull: false
      }

      // Colocar Relações
    },
    {
      tableName: 'users',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  User.belongsToMany(sequelize.models.Route, { foreignKey: 'user_id', through: 'user_routes', as: 'routes' })
  User.belongsToMany(sequelize.models.Company, { foreignKey: 'user_id', through: 'user_companies', as: 'companies' })
  User.hasMany(sequelize.models.DoneLesson, { foreignKey: 'user_id', as: 'done_lessons' })
  User.hasMany(sequelize.models.DoneRoute, { foreignKey: 'user_id', as: 'done_routes' })
  User.hasMany(sequelize.models.Account, { foreignKey: 'user_id', as: 'accounts' })
  User.hasMany(sequelize.models.Payment, { foreignKey: 'user_id', as: 'payments' })
}
