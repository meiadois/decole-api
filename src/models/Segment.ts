import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize'

export interface SegmentI {
  id?: number | null;
  name: string;
}
export class SegmentModel extends Model implements SegmentI {
  public id?: number;
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /*
  public static associations: {
    projects: Association<User, Project>;
  }; */
}
export function initSegment (sequelize: Sequelize): void {
  SegmentModel.init(
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

export function associateSegment (): void {
  console.log('Segment dont have associations')
}
