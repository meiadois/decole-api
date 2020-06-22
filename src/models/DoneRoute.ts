import { Sequelize, Model, DataTypes } from 'sequelize'

export interface DoneRouteI {
  id?: number | null;
  user_id: number;
  route_id: number;
}
export class DoneRoute extends Model implements DoneRouteI {
  public id?: number;
  public route_id!: number;
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
  DoneRoute.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      route_id: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'done_routes',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  DoneRoute.belongsTo(sequelize.models.User, { foreignKey: 'user_id', as: 'user' })
  DoneRoute.belongsTo(sequelize.models.Route, { foreignKey: 'route_id', as: 'route' })
}
