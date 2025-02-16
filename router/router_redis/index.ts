import{RedisClientType } from 'redis'
export interface ROUTER_REDIS {
    RedisHook(username: string, password: string): void
    RedisSetup(username: string, password: String): void
    RedisClient(username: string, password: string):Promise<any>
}