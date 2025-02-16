import EventEmitter = require('events');
import { EventEmitterAsyncResource } from 'events';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';

import { ROUTERSTATUS } from '../router';
import ROUTER from '../index';

export interface ROUTER_EVENTS
{
    Options?: object
}

export interface ROUTER_EVENTS_LISTENER extends ROUTER
{
    addListener (
        event_name?: string,
        router_name?: string,
        option?: {
            timeout?: ROUTERSTATUS,
            callback?: (val: any, d: object, cb: () => void, req: Http2ServerRequest, res: Http2ServerResponse) => void
        }
    ): any

    eventHook (
        event_name?: string,
        request?: Http2ServerRequest,
        response?: Http2ServerResponse,
        option?: {
            hook_name?: string,
            data?: object | string | null | undefined | number,
            callback?: (val: any, d: object, cb: () => void, req: Http2ServerRequest, res: Http2ServerResponse) => void
        }
    ): any

    signal (
        url?: string,
        signal?: AbortSignal,
        
    ): any
}

export class ROUTER_EVENT_CLASS extends EventEmitter<object>
{
    static Router_Event__ (option?: { router_name?: string, event_name?: string }, event?: EventEmitterAsyncResource);
}

