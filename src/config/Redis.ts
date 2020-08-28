import { REDIS_HOST, REDIS_PORT, IS_PRODUTION, REDIS_PASSWORD } from "@config/Constants";
import * as IORedis  from 'ioredis'

const RedisConfig: IORedis.RedisOptions = {
    host : REDIS_HOST,
    port : REDIS_PORT,
    password: IS_PRODUTION ? REDIS_PASSWORD : null
}

export default RedisConfig