import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { clearTimeout, setTimeout } from 'timers';
import { ROUTER_INTERFACE, ROUTERSTATUS } from './router';
import { ROUTER_UTILS } from './router_utils';
const urlss = require("url");
const Buffer = require("buffer");
const client = require('net')
const type = require('../utils/types');
class ROUTER implements ROUTER_INTERFACE {

    /* readme.md
    * title:'router_status'
    * parse: [{name:host,note:主机地址,type:string,isparam:true},{name:port,note:主机端口号,type:number,isparam:true}]
    * isparam:'true'
    */
    router_initListener(host: string, port: number, req: Http2ServerRequest): Promise<object> {
        return new Promise((res, rej) => {
            let net = new client.Socket();
            let timeout = setTimeout(() => {
                net.destroy();
            }, ROUTERSTATUS.ROUTER_TIMEOUT);
            net.connect(port, host, () => {
                net.write('hello world');
            })
            net.on('data', () => {
                res(ROUTER_UTILS.ROUTER_ROUTERSUCCESS);
                clearTimeout(timeout);
                net.end();
            })
            net.on('close', () => {
                res(ROUTER_UTILS.ROUTER_ROUTERCLOSE)
            })
            net.on('error', (err: any) => {
                clearTimeout(timeout);
                res(ROUTER_UTILS.ROUTER_ROUTERTIMEOUT)

                net.destroy();
            })

        })
    };
    router_Listener(req: Http2ServerRequest): void {
        req.setTimeout(ROUTERSTATUS.ROUTER_TIMEOUT, () => {
            req.headers.connection = 'close';
            req.headers["content-length"] = '0';
            req.headers.cookie = '';
            req.socket.closed;
        })

    };
    setAccess(response: Http2ServerResponse): void {
        this.writeHeader(response, ROUTERSTATUS.ROUTER_200, {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "text/json;charset=utf-8"
        });
    };
    /*Get request address (type: String)*/
    pathname(request: Http2ServerRequest): string {
        return urlss.parse(request.url).pathname.toString();
    };

    /*Request type determination*/
    typeConfirm(types: any, url: string): boolean {
        return !(!type.isUndefine(url) && !type.isString(url) && !type.isString(types) && type.isUndefine(types));
    };
    writeHeader(res: Http2ServerResponse, num: number, header: object): Http2ServerResponse {
        return res.writeHead(num, Object.assign(header));
    }
    parames(req: Http2ServerRequest, res: Http2ServerResponse, body: string, type: number): Promise<object> | undefined {
        switch (type) {
            case 0:
                //get
                let urls = req.url;
                const path = urls.split("/");
                const u = path[2];
                return new Promise((resolve: any, reject) => {
                    resolve({
                        url: u
                    })
                })
            case 1:
                //get
                let parseUrl = urlss.parse(req.url, true);
                let query = parseUrl.query;
                return new Promise((resolve: any, reject) => {
                    resolve({
                        url: query
                    })
                })
            case 2:
                //post<json>
                let parse = JSON.parse(body)
                this.writeHeader(res, ROUTERSTATUS.ROUTER_200, { 'Content-Type': 'application/json' })
                return new Promise((resolve: any, reject) => {
                    resolve({
                        url: parse
                    })
                })


        }

    }
    /*Routing master pointer (req, res, d, callback)*/
    handler(method: string, path: string, req: Http2ServerRequest, res: Http2ServerResponse, d: object | undefined | string | null | number, callback: (val: any, d: object, cb: () => {}, parames: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}): Promise<object> {
        return new Promise((resolve, reject) => {
            let data = Buffer;
            req.on('error', (err) => {
                reject(err)
            }).on('data', (chunk) => {
                data.push(chunk);
            }).on('end', () => {
                resolve({
                    req: req,
                    res: res,
                    data: data,
                    method: method,
                    path: path,
                    maincb: callback,
                    cb: this.method,
                    parames: this.parames,
                    maindata: d
                });
            })
        })
    };

    /*Request Method Classification(Promise)*/
    method(methods: string, path: string, req: Http2ServerRequest, res: Http2ServerResponse, data: Uint8Array[], callback: (val: any, d: object, cb: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}, d: object): Promise<object> {
        return new Promise((resolve, reject) => {
            const method = req.method.toLowerCase();
            const urls = req.headers['']
            const tmpurl = urls + path;
            console.log(urls, tmpurl, req.url);
            if (method == methods && methods == 'get') {
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d
                });
            } else if (method == methods && methods == 'get') {
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d
                });
            } else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the get method' }
                })
            }
            if (method === methods && methods === 'post' && path === req.url) {
                if (Object.keys(data).length > 1e6) return req.connection.destroy();
                let str: string = '';
                str += Buffer.Buffer.concat(data).toString();
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d,
                    body: str
                });
            } else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the post method' }
                })
            }
            if (method === methods && methods === 'put' && path === req.url) {
                if (data.length > 1e6) return req.connection.destroy();
                let str: string = '';
                str += Buffer.Buffer.concat(data).toString();
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d,
                    body: str
                })
            } else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the put method' }
                })
            }
            if (method === methods && methods === 'delete' && path === req.url) {
                if (data.length > 1e6) return req.connection.destroy();
                let str: string = '';
                str += Buffer.Buffer.concat(data).toString();
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d,
                    body: str
                })
            } else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the delete method' }
                })
            }
        })
    };

    /*Routing Master((url, URL, req, res, data, callback))*/
    router(method: string, url: string, URL: string, request: Http2ServerRequest, resp: Http2ServerResponse, parames: object | any | unknown, data: object | string | null | undefined | number): any {
        this.router_initListener(ROUTERSTATUS.ROUTER_HOST, ROUTERSTATUS.ROUTER_PORT, request).then((res: any) => {
            this.router_Listener(request);
            if (res["code"] === ROUTERSTATUS.ROUTER_200) {
                this.setAccess(resp)
                switch (url) {
                    case URL:
                        try {
                            this.handler(method, url, request, resp, data, (val, d, cb, req, res): object | any => {
                                val = d;
                                let result: object = {};
                                if (parames !== null) {
                                    const uri = request.url;
                                    const parse = urlss.parse(uri, true);
                                    const query = parse.query;
                                    for (let key in query) {
                                        for (let k in parames) {
                                            const uu = Object.entries(parames) && Object.entries(query);
                                            if (uu !== null) {
                                                const regex = /&([^=]+)=([^&]*)/g;
                                                let match: any;
                                                while ((match = regex.exec(uri) != null)) {
                                                    result = {
                                                        str: type.TypeJson(val),
                                                        data: val ? (query[key] === parames[k] && key === k && query[key] === match[2] && parames[k] === match[2] && key === match[1] && k === match[1]) : null,
                                                        cb: cb,
                                                        req: req,
                                                        res: res
                                                    };
                                                }
                                                return result;
                                            }
                                            return result = {
                                                str: type.TypeJson(val),
                                                data: val,
                                                cb: cb,
                                                req: req,
                                                res: res
                                            };
                                        }
                                    }
                                }
                                else {
                                    result = {
                                        str: type.TypeJson(val),
                                        data: val,
                                        cb: cb,
                                        req: req,
                                        res: res
                                    };
                                    return result;
                                }
                                return result;
                            }).then(ret => {
                                let obj: { req: Http2ServerRequest; res: Http2ServerResponse; cb: (method: string, url: string, req: Http2ServerRequest, res: Http2ServerResponse, data: object | string | null | undefined | number, maincb: any, maindata: any) => {}; method: string; url: string; data: object; maincb: () => {}; maindata: object; }
                                obj = ret as typeof obj;
                                return obj.cb(method, url, request, resp, data, obj.maincb, obj.maindata)
                            }).then(ret => {
                                let obj: { req: Http2ServerRequest; res: Http2ServerResponse; cb: (method: string, url: string, req: Http2ServerRequest, res: Http2ServerResponse, data: object, maincb: any, maindata: any) => {}; method: string; url: string; data: object; maincb: (url: string, maindata: object, maincb: (url: string, maindata: object, maincb: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}; maindata: object; }
                                obj = ret as typeof obj;
                                return obj.maincb(obj.url, obj.maindata, obj.maincb, obj.req, obj.res);
                            }).then(ret => {
                                let obj: { str: string; req: Http2ServerRequest; res: Http2ServerResponse; method: string; url: string; data: object; maincb: (url: string, maindata: object, maincb: (url: string, maindata: object, maincb: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}; maindata: object; }
                                obj = ret as typeof obj;
                                if (obj.str == "undefined" || obj.str == "" || obj.str == null) {
                                    return;
                                } else {
                                    return obj.res.end(obj.str);
                                }

                            }).then(res, (err) => {

                                throw new Error(err);
                            })
                            break;
                        } catch (e) {
                            throw new Error('');
                        }
                }
            } else {
                res = {
                    msg: '微服务异常',
                    code: ROUTERSTATUS.ROUTER_504
                };
            }
        })
    };

}
export default ROUTER