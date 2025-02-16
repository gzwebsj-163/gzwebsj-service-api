"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_UTILS = void 0;
var router_1 = require("../router");
exports.ROUTER_UTILS = {
    ROUTER_ROUTERSUCCESS: {
        msg: '监听没有超时，请放心使用',
        code: router_1.ROUTERSTATUS.ROUTER_200,
        data: '微路由正常'
    },
    ROUTER_ROUTERCLOSE: {
        msg: '尝试关闭中...',
        code: router_1.ROUTERSTATUS.ROUTER_504
    },
    ROUTER_ROUTERTIMEOUT: {
        msg: '已经超时,请检查服务端',
        code: router_1.ROUTERSTATUS.ROUTER_504,
        err: 'error'
    },
    ROUTER_ROUTERRESET: {
        msg: '重启成功',
        code: router_1.ROUTERSTATUS.ROUTER_200,
        data: '微路由重启了'
    },
    ROUTER_ROUTERMSG: {
        msg: 'fork send the messages',
        code: router_1.ROUTERSTATUS.ROUTER_300
    },
    ROUTER_ROUTERFETCH: {
        msg: 'Fetch operation was aborted',
        code: router_1.ROUTERSTATUS.ROUTER_300
    }
};
