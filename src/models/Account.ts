import { Sequelize, Model, DataTypes } from 'sequelize'

export interface AccountI {
  id?: number | null;
  username: string;
  user_id: number;
  channel_id: number;
}
export class Account extends Model implements AccountI {
  public id?: number;
  public username!: string;
  public user_id!: number;
  public channel_id!: number;

  // Colocar usuário

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    channel: Association<Account, Channel>;
  }; */
}
export function init (sequelize: Sequelize): void {
  Account.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      channel_id: {
        type: DataTypes.INTEGER.UNSIGNED
      }
      // Colocar usuário
    },
    {
      tableName: 'accounts',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  Account.belongsTo(sequelize.models.User, { foreignKey: 'user_id', as: 'user' })
  Account.belongsTo(sequelize.models.Channel, { foreignKey: 'channel_id', as: 'channel' })
}
