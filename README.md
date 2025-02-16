### 项目目录一览
>
```
├── README.md
├── dist
│   ├── index.js
│   ├── router
│   │   ├── index.js
│   │   ├── router.js
│   │   ├── router_event
│   │   │   └── event.js
│   │   ├── router_exception
│   │   │   └── exception.js
│   │   └── router_utils
│   │       └── index.js
│   └── utils
│       ├── index.js
│       └── types
│           └── index.js
├── router_server.ts
├── index.js
├── index.ts
├── package-lock.json
├── package.json
├── router
│   ├── index.js
│   ├── index.ts
│   ├── router.js
│   ├── router.ts
│   ├── router_event
│   │   ├── event.js
│   │   ├── event.ts
│   │   ├── index.d.js
│   │   └── router_server.ts
│   ├── router_exception
│   │   ├── exception.ts
│   │   └── router_server.ts
│   └── router_utils
│       ├── index.js
│       └── index.ts
├── test
├── tsconfig.json
└── utils
    ├── index.js
    ├── index.ts
    └── types
        ├── index.js
        └── index.ts
```
### 项目简介
```
项目名称：gzwebsj-service

项目版本：v0.0.1

项目作者: gzwebsj@163.com
```
### 项目使用说明
框架使用nodejs HttpServer2+架构,轻量级的微服务框架！

router_event 事件监听器
```typescript
主指针函数:
ROUTER_EVENT
handler(method: string, path: string, req: Http2ServerRequest, res: Http2ServerResponse, d: object, callback: (val: any, d: object, cb: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}): Promise<object>

进程监听器和事件监听器：
ROUTER_EVENT
addListener(event_name: string, router_name: string, option: { timeout: number; callback: (...args: any[]) => void}): any

事件钩子
ROUTER_EVENT
eventHook(event_name: string, request: Http2ServerRequest, response: Http2ServerResponse, option: { hook_name: string; data: object; callback: (...args: any[]) => void }): any

路由标示
ROUTER_EVENT
async signal(url: string, signal: AbortSignal): Promise<any>
```

router 主函数
```typescript
路由初始化监听器
ROUTER
router_initListener(host: string, port: number, req: Http2ServerRequest): Promise<object> 

路由监听器
ROUTER
router_Listener(req: Http2ServerRequest): void

路由跨域
ROUTER
setAccess(response: Http2ServerResponse): void

路由
ROUTER
router(method: string, url: string, URL: string, req: Http2ServerRequest, resp: Http2ServerResponse, data: object): any
```
nacos 操作类
``` typescript
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
```

UTILS 工具类
``` javascript
match()
数据类型判断
isUndefine();

isNull();

isString();

isNumber();

isObject();

isFunction();

isJson();

isObjectObject();

TypeObjectStrValue();

TypeObjectNumValue();

TypeObjectAssgin();

TypeJson();

TypeJsonParse();

```
## 使用实例
```typescript
const testevent = new ROUTER_EVENT();
const wxdomain = new ROUTER_EVENT();
const testrouter = (url: string, req: Http2ServerRequest, res: Http2ServerResponse) => {
    wxdomain.addListener("hello", url, {
        timeout: 1000, async callback() {
            
            const json: object | any = {data:{code:200,msg:"Hello World"}};
            routers.router('get', url, '/api/hello', req, res, null, json);
            testevent.eventHook("hello", req, res, { hook_name: 'domain', data: json, callback() { } })
        }
    })
}
```
## readme_create 也是本人作品[已加入]
### npm安装命令 npm install readme_create
### 使用方法：
>
1. 在你需要生成ReadMe的代码上加上，以下注释：
>
<!-- /* readme.md
* title:'Test'
* parse: [{name:value,note:传入的值,type:string,isparam:true},{name:type,note:传入类型,type:object,isparam:true},{name:key,note:传入键值,type:string,isparam:true}]
* isparam:'true'
*/ -->
>
#### 详细可参考测试目录中的code.test,里面的注释代码！
>
2. 接着需要在新建一个文件或用test目录中index.ts,里的此函数readme.ReadFile()进行使用。
>
3. 废话不想多说，自己研究。


### 如果发现debug

联系邮箱: gzwebsj@163.com

### 谢谢🙏您的支持，请多多包涵#