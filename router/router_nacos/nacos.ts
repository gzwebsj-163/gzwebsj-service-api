import { NacosConfigClient } from "nacos";
const fsys = require("../../utils/fs")
const env = process.cwd() + '/config/development.env'
fsys.openENV(env);
export class ROUTER_NACOS {
    private nacosuser: string | undefined = process.env.NACOS_USER
    private nacospass: string | undefined = process.env.NACOS_PASS;
    private nacoslocalhost: string | undefined = process.env.NACOS_SERVER;
    private nacosproviderNameSpace: string | undefined = process.env.NACOS_PROVIDERNAMESPASE;
    private nacosNameSpaceID: string | undefined = process.env.NACOS_NAMESPACEID;
    private nacosgroup: string | undefined = process.env.NACOS_GROUP;
    nacos(address: string | undefined, Namespace: string | undefined, user: string | undefined, pass: string | undefined): NacosConfigClient {
        return new NacosConfigClient({
            serverAddr: address,
            namespace: Namespace,
            username: user,
            password: pass
        })
    }
    async getConfig(id: string | undefined, group: string | undefined) {
        const config = await this.nacos(this.nacoslocalhost, this.nacosproviderNameSpace, this.nacosuser, this.nacospass).getConfig(id, group);
        return config;
    }
    nacosHook(id: string | undefined, group: string | undefined): Promise<string> {
        const config = this.getConfig(id, group);
        return config;
    }
}