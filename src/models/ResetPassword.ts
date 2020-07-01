import { Sequelize, Model, DataTypes } from 'sequelize'

export interface ResetPasswordI {
  id?: number | null;
  token: string;
  user_id: number;

  expiresAt: Date;
}
export class ResetPassword extends Model implements ResetPasswordI {
  public id?: number;
  public user_id!: number;
  public token!: string;
  public expiresAt!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  ResetPassword.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: 'reset_passwords',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {}
