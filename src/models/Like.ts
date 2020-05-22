import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface LikeI {
  id?: number | null;
  status: string;
  sender_id: number;
  recipient_id: number;
}
export class Like extends Model implements LikeI {
  public id?: number;
  public status!: string;
  public sender_id!: number;
  public recipient_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      sender_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      recipient_id: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    },
    {
      tableName: 'likes',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  Like.belongsTo(sequelize.models.Company, { foreignKey: 'sender_id', as: 'sender_company' })
  Like.belongsTo(sequelize.models.Company, { foreignKey: 'recipient_id', as: 'recipient_company' })
}
