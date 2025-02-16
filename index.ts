const http = require('http');
const mysql = require("mysql2");
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import * as path from 'path'
let o: string = path.normalize('./router');
import ROUTER from './router';
import { ROUTER_EVENT } from './router/router_event/event';
import { ROUTER_NACOS } from './router/router_nacos/nacos';
const nacos = new ROUTER_NACOS()
const routers = new ROUTER();
//每一条都是单独的微服务
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

http.createServer((req: Http2ServerRequest, res: Http2ServerResponse) => {
    let url = routers.pathname(req);
    testrouter(url, req, res);
}).listen(8111);