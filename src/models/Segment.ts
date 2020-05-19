import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'
import { Company } from './Company'

export interface SegmentI {
  id?: number | null;
  name: string;
}
export class Segment extends Model implements SegmentI {
  public id?: number;
  public name!: string;

  public getCompanies!: HasManyGetAssociationsMixin<Company>; // Note the null assertions!
  public addCompany!: HasManyAddAssociationMixin<Company, number>;
  public hasCompany!: HasManyHasAssociationMixin<Company, number>;
  public countCompanies!: HasManyCountAssociationsMixin;
  public createCompany!: HasManyCreateAssociationMixin<Company>;

  public readonly companies?: Company[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    companies: Association<Segment, Company>;
  };
}
export function init (sequelize: Sequelize): void {
  Segment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'segments',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  Segment.hasMany(sequelize.models.Company, { foreignKey: 'segment_id', as: 'companies' })
}
