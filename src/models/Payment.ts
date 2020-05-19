import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface PaymentI {
  id?: number | null;
  user_id: number | null;
  price: number;
  description: string;
  value: number;
  date: Date;
  type: string;
  status: string;
}
export class Payment extends Model implements PaymentI {
  public id?: number;
  public user_id!: number;

  public price!: number;
  public description!: string;
  public value!: number;
  public date!: Date;
  public type!: string;
  public status!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function init (sequelize: Sequelize): void {
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'payments',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  Payment.belongsTo(sequelize.models.User, { foreignKey: 'user_id', as: 'user' })
}
