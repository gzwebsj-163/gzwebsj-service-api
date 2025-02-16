import { fork } from 'child_process';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { ROUTER_EVENTS_LISTENER } from './index';
import { ROUTERSTATUS } from '../router';
import { isJson, isNull, isString, isUndefine } from '../../utils/types';
import ROUTER from '../index';
import { ROUTER_UTILS } from '../router_utils';
const { AbortController } = require("abort")
const TIME_OUT: number = 1000

export class ROUTER_EVENT extends ROUTER implements ROUTER_EVENTS_LISTENER  {
    
    handler(method: string, path: string, req: Http2ServerRequest, res: Http2ServerResponse, d: object, callback: (val: any, d: object, cb: () => {}, parames: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}): Promise<object> {
        this.addListener("router_event", path, { timeout: TIME_OUT, callback })
        return super.handler(method, path, req, res, d, callback);
    }

    addListener(event_name: string, router_name: string, option: { timeout: number; callback: (...args: any[]) => void }): any {
        if (isUndefine(event_name) && isUndefine(event_name) && isNull(option)) return false;
        let messageMsg = fork(process.cwd() + '/router/router.js')
        if (!messageMsg.connected && !messageMsg.isPrototypeOf(option.callback)) return false;
        messageMsg.send(ROUTER_UTILS.ROUTER_ROUTERMSG.msg)
        process.addListener("beforeExit", () => {
            const controller = new AbortController();
            let signal = controller.signal;
            signal.addEventListener('abort', () => {
                this.signal(router_name, signal).then(data => {
                    return option.callback(data);
                });
            })
            controller.signal = signal;
        })
        process.removeAllListeners(event_name);
        option.callback();
    }

    eventHook(event_name: string, request: Http2ServerRequest, response: Http2ServerResponse, option: { hook_name: string; data: object | string | null | undefined | number; callback: (...args: any[]) => void }): any {
        if (!isString(event_name) && !isString(option.hook_name)) return false
        process.addListener("disconnect", () => {
            if (event_name === "router_event" && request.complete && request.aborted) {
                const tmpmethod: string = request.method.toLowerCase()
                this.router_Listener(request);
                this.setAccess(response);
                this.router_initListener(ROUTERSTATUS.ROUTER_HOST, ROUTERSTATUS.ROUTER_PORT, request);
            } else {
                return;
            }
        }).nextTick(() => {
            request.emit('close');
            request.emit('end');
        })
    }

    async signal(url: string, signal: AbortSignal): Promise<any> {
        try {
            const response = await fetch(url, { signal });
            if (!isJson(response.json())) return false;
            return await response.json();
        } catch (error: string | any) {
            throw new Error(error)
        }
    }

}
