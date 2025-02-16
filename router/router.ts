 import { Http2ServerResponse, Http2ServerRequest, Http2SecureServer } from 'http2';
import ROUTER from "./index";
export enum ROUTERSTATUS {
    ROUTER_ERROR = 1,
    ROUTER_WARRING = 2,
    ROUTER_SUCCESS = 3,
    ROUTER_TIMEOUT = 10000,
    ROUTER_HOST = '127.0.0.1',
    ROUTER_PORT = 8111,
    ROUTER_504 = 504,
    ROUTER_200 = 200,
    ROUTER_300 = 300,
    ROUTER_INTER = 1000,
    ROUTER_ABORTERROR = 'AbortError'
}
export interface ROUTER_INTERFACE {
    router_initListener(host: string, port: number, req: Http2ServerRequest): Promise<object>
    router_Listener(req: Http2ServerRequest): void;
    setAccess(response: Http2ServerResponse): void;
    pathname(request: Http2ServerRequest): string;
    typeConfirm(types: any, url: string): boolean;
    writeHeader(res: Http2ServerResponse, num: number, header: object): Http2ServerResponse
    parames(req: Http2ServerRequest, res: Http2ServerResponse, body: string, type: number): Promise<object> | undefined
    handler(method: string, path: string, req: Http2ServerRequest, res: Http2ServerResponse, d: object, callback: (val: any, d: object, cb: () => {}, parames: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}): Promise<object>;
    method(methods: string, path: string, req: Http2ServerRequest, res: Http2ServerResponse, data: Uint8Array[], callback: (val: any, d: object, cb: () => {}, req: Http2ServerRequest, res: Http2ServerResponse) => {}, d: object): Promise<object>;
    router(method: string, urls: string, URL: string, request: Http2ServerRequest, res: Http2ServerResponse,parames:object, data: object): any;
}