"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timers_1 = require("timers");
var router_1 = require("./router");
var router_utils_1 = require("./router_utils");
var urlss = require("url");
var Buffer = require("buffer");
var client = require('net');
var type = require('../utils/types');
var ROUTER = /** @class */ (function () {
    function ROUTER() {
    }
    /* readme.md
    * title:'router_status'
    * parse: [{name:host,note:主机地址,type:string,isparam:true},{name:port,note:主机端口号,type:number,isparam:true}]
    * isparam:'true'
    */
    ROUTER.prototype.router_initListener = function (host, port, req) {
        return new Promise(function (res, rej) {
            var net = new client.Socket();
            var timeout = (0, timers_1.setTimeout)(function () {
                net.destroy();
            }, router_1.ROUTERSTATUS.ROUTER_TIMEOUT);
            net.connect(port, host, function () {
                net.write('hello world');
            });
            net.on('data', function () {
                res(router_utils_1.ROUTER_UTILS.ROUTER_ROUTERSUCCESS);
                (0, timers_1.clearTimeout)(timeout);
                net.end();
            });
            net.on('close', function () {
                res(router_utils_1.ROUTER_UTILS.ROUTER_ROUTERCLOSE);
            });
            net.on('error', function (err) {
                (0, timers_1.clearTimeout)(timeout);
                res(router_utils_1.ROUTER_UTILS.ROUTER_ROUTERTIMEOUT);
                net.destroy();
            });
        });
    };
    ;
    ROUTER.prototype.router_Listener = function (req) {
        req.setTimeout(router_1.ROUTERSTATUS.ROUTER_TIMEOUT, function () {
            req.headers.connection = 'close';
            req.headers["content-length"] = '0';
            req.headers.cookie = '';
            req.socket.closed;
        });
    };
    ;
    ROUTER.prototype.setAccess = function (response) {
        this.writeHeader(response, router_1.ROUTERSTATUS.ROUTER_200, {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "text/json;charset=utf-8"
        });
    };
    ;
    /*Get request address (type: String)*/
    ROUTER.prototype.pathname = function (request) {
        return urlss.parse(request.url).pathname.toString();
    };
    ;
    /*Request type determination*/
    ROUTER.prototype.typeConfirm = function (types, url) {
        return !(!type.isUndefine(url) && !type.isString(url) && !type.isString(types) && type.isUndefine(types));
    };
    ;
    ROUTER.prototype.writeHeader = function (res, num, header) {
        return res.writeHead(num, Object.assign(header));
    };
    ROUTER.prototype.parames = function (req, res, body, type) {
        switch (type) {
            case 0:
                //get
                var urls = req.url;
                var path = urls.split("/");
                var u_1 = path[2];
                return new Promise(function (resolve, reject) {
                    resolve({
                        url: u_1
                    });
                });
            case 1:
                //get
                var parseUrl = urlss.parse(req.url, true);
                var query_1 = parseUrl.query;
                return new Promise(function (resolve, reject) {
                    resolve({
                        url: query_1
                    });
                });
            case 2:
                //post<json>
                var parse_1 = JSON.parse(body);
                this.writeHeader(res, router_1.ROUTERSTATUS.ROUTER_200, { 'Content-Type': 'application/json' });
                return new Promise(function (resolve, reject) {
                    resolve({
                        url: parse_1
                    });
                });
        }
    };
    /*Routing master pointer (req, res, d, callback)*/
    ROUTER.prototype.handler = function (method, path, req, res, d, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = Buffer;
            req.on('error', function (err) {
                reject(err);
            }).on('data', function (chunk) {
                data.push(chunk);
            }).on('end', function () {
                resolve({
                    req: req,
                    res: res,
                    data: data,
                    method: method,
                    path: path,
                    maincb: callback,
                    cb: _this.method,
                    parames: _this.parames,
                    maindata: d
                });
            });
        });
    };
    ;
    /*Request Method Classification(Promise)*/
    ROUTER.prototype.method = function (methods, path, req, res, data, callback, d) {
        return new Promise(function (resolve, reject) {
            var method = req.method.toLowerCase();
            //获取get参数 这里还是有bug
            var urls = req.headers[''];
            var tmpurl = urls + path;
            console.log(urls, tmpurl, req.url);
            if (method == methods && methods == 'get') {
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d
                });
            }
            else if (method == methods && methods == 'get') {
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d
                });
            }
            else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the get method' }
                });
            }
            if (method === methods && methods === 'post' && path === req.url) {
                if (Object.keys(data).length > 1e6)
                    return req.connection.destroy();
                var str = '';
                str += Buffer.Buffer.concat(data).toString();
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d,
                    body: str
                });
            }
            else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the post method' }
                });
            }
            if (method === methods && methods === 'put' && path === req.url) {
                if (data.length > 1e6)
                    return req.connection.destroy();
                var str = '';
                str += Buffer.Buffer.concat(data).toString();
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d,
                    body: str
                });
            }
            else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the put method' }
                });
            }
            if (method === methods && methods === 'delete' && path === req.url) {
                if (data.length > 1e6)
                    return req.connection.destroy();
                var str = '';
                str += Buffer.Buffer.concat(data).toString();
                return resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: d,
                    body: str
                });
            }
            else {
                resolve({
                    req: req,
                    res: res,
                    url: urlss.parse(req.url, true),
                    maincb: callback,
                    maindata: { msg: 'is not the delete method' }
                });
            }
        });
    };
    ;
    /*Routing Master((url, URL, req, res, data, callback))*/
    ROUTER.prototype.router = function (method, url, URL, request, resp, parames, data) {
        var _this = this;
        this.router_initListener(router_1.ROUTERSTATUS.ROUTER_HOST, router_1.ROUTERSTATUS.ROUTER_PORT, request).then(function (res) {
            _this.router_Listener(request);
            if (res["code"] === router_1.ROUTERSTATUS.ROUTER_200) {
                _this.setAccess(resp);
                switch (url) {
                    case URL:
                        try {
                            _this.handler(method, url, request, resp, data, function (val, d, cb, req, res) {
                                val = d;
                                var result = {};
                                if (parames !== null) {
                                    var uri = request.url;
                                    var parse = urlss.parse(uri, true);
                                    var query = parse.query;
                                    for (var key in query) {
                                        for (var k in parames) {
                                            var uu = Object.entries(parames) && Object.entries(query);
                                            if (uu !== null) {
                                                var regex = /&([^=]+)=([^&]*)/g;
                                                var match = void 0;
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
                            }).then(function (ret) {
                                var obj;
                                obj = ret;
                                return obj.cb(method, url, request, resp, data, obj.maincb, obj.maindata);
                            }).then(function (ret) {
                                var obj;
                                obj = ret;
                                return obj.maincb(obj.url, obj.maindata, obj.maincb, obj.req, obj.res);
                            }).then(function (ret) {
                                var obj;
                                obj = ret;
                                if (obj.str == "undefined" || obj.str == "" || obj.str == null) {
                                    return;
                                }
                                else {
                                    return obj.res.end(obj.str);
                                }
                            }).then(res, function (err) {
                                throw new Error(err);
                            });
                            break;
                        }
                        catch (e) {
                            throw new Error('');
                        }
                }
            }
            else {
                res = {
                    msg: '微服务异常',
                    code: router_1.ROUTERSTATUS.ROUTER_504
                };
            }
        });
    };
    ;
    return ROUTER;
}());
exports.default = ROUTER;
