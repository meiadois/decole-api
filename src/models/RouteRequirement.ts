import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface RouteRequirementI {
  id?: number | null;
  required_route_id: number;
  route_id: number;
}
export class RouteRequirement extends Model implements RouteRequirementI {
  public id?: number;
  public required_route_id!: number;
  public route_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  RouteRequirement.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      route_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      required_route_id: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'route_requirements',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  RouteRequirement.belongsTo(sequelize.models.Route, { foreignKey: 'required_route_id', as: 'required_route' })
  RouteRequirement.belongsTo(sequelize.models.Route, { foreignKey: 'route_id', as: 'route' })
}
