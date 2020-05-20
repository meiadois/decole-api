import { Sequelize, Model, DataTypes, BuildOptions, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin, BelongsToManyCountAssociationsMixin, BelongsToManyCreateAssociationMixin } from 'sequelize'
import { User } from './User'
import { Like } from './Like'

export interface CompanyI {
  id?: number | null;
  name: string;
  cep: string;
  thumbnail: string;
  banner: string;
  cnpj: string;
  cellphone: string;
  email: string;
  description: string;
  visible: boolean;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
  segment_id: number;
}
export class Company extends Model implements CompanyI {
  public id?: number;
  public name!: string;
  public cep!: string;
  public thumbnail!: string;
  public banner!: string;
  public cnpj!: string;
  public cellphone!: string;
  public email!: string;
  public description!: string;
  public visible!: boolean;
  public city!: string;
  public neighborhood!: string;
  public state!: string;
  public street!: string;

  public segment_id!: number;

  public getUsers!: BelongsToManyGetAssociationsMixin<User>; // Note the null assertions!
  public addUser!: BelongsToManyAddAssociationMixin<User, number>;
  public hasUser!: BelongsToManyHasAssociationMixin<User, number>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
  public createUser!: BelongsToManyCreateAssociationMixin<User>;

  public getSentLikes!: HasManyGetAssociationsMixin<Like>; // Note the null assertions!
  public addSentLike!: HasManyAddAssociationMixin<Like, number>;
  public hasSentLike!: HasManyHasAssociationMixin<Like, number>;
  public countSentLikes!: HasManyCountAssociationsMixin;
  public createSentLike!: HasManyCreateAssociationMixin<Like>;

  public getReceivedLikes!: HasManyGetAssociationsMixin<Like>; // Note the null assertions!
  public addReceivedLike!: HasManyAddAssociationMixin<Like, number>;
  public hasReceivedLike!: HasManyHasAssociationMixin<Like, number>;
  public countReceivedLikes!: HasManyCountAssociationsMixin;
  public createReceivedLike!: HasManyCreateAssociationMixin<Like>;

  public readonly users?: User[];
  public readonly sent_likes?: Like[];
  public readonly received_likes?: Like[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    users: Association<Company, User>;
    sent_likes: Association<Company, Like>;
    received_likes: Association<Company, Like>;
  };
}
export function init (sequelize: Sequelize): void {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      segment_id: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cellphone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },

      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'companies',
      sequelize: sequelize // this bit is important
    }
  )
}

export function associate (sequelize: Sequelize): void {
  Company.belongsTo(sequelize.models.Segment, { foreignKey: 'segment_id', as: 'segment' })
  Company.belongsToMany(sequelize.models.User, { foreignKey: 'company_id', through: 'user_companies', as: 'users' })
  Company.hasMany(Like, { foreignKey: 'sender_id', as: 'sent_likes' })
  Company.hasMany(Like, { foreignKey: 'recipient_id', as: 'received_likes' })
}
