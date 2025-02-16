import { RedisClientOptions, RedisClientType, createClient } from 'redis'
import { ChildProcess } from 'child_process'
import { ROUTER_REDIS } from '.';

export class Router_Redis implements ROUTER_REDIS {

    protected child: AsyncIterableIterator<any> = ChildProcess.on(process, 'router_redis')
    public username:string = '';
    public password:string = ''; 
    public redis = createClient({
        username:this.username,
        password:this.password
    });
    RedisHook(username: string, password: string): void {
        process.addListener("beforeExit", () => {
            this.child.next().catch(res => {
                this.redis.on('connect', r => {
                    res = this.child.return ? null : r;
                    return res;
                })
                this.redis.on('error', r => {
                    res = this.child.return ? null : r;
                    return res;
                })
            }).catch(r => {
                r = process.abort();
                return r;
            });
        })
        process.addListener("exit", () => {
            this.child.next().finally(() => {
                this.redis.on('connect', r => {
                    r = this.child.return ? null : r;
                    return r;
                })
                this.redis.on('error', r => {
                    r = this.child.return ? null : r;
                    return r;
                })
            });
        })

    }
    RedisSetup(username: string, password: string): void {
        this.RedisHook(username, password);
    }
    async RedisClient(username: string, password: string): Promise<any> {

    }
}