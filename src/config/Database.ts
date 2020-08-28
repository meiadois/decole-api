import { 
    DATABASE_HOST, 
    DATABASE_NAME, 
    DATABASE_PASSWORD, 
    DATABASE_PORT, 
    DATABASE_USERNAME
} from '../config/Constants'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Entities from '@/database/entity';

export const DatabaseConfig:TypeOrmModuleOptions = {
  type: "mysql",
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: Entities,
  migrations: ["../database/migration/*{.ts,.js}"],
  subscribers: ["../database/subscriber/*{.ts,.js}"],
  synchronize: false
} 

export default DatabaseConfig