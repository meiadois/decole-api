import { REDIS_HOST, REDIS_PORT } from "@config/Constants";
import * as IORedis  from 'ioredis'

const RedisConfig: IORedis.RedisOptions = {
    host : REDIS_HOST,
    port : REDIS_PORT,
}

export default RedisConfig