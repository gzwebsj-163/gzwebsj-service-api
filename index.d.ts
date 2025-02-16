
import { ROUTER_INTERFACE } from "./router/router";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
export interface ReadModule{
    ReadFile(path?: string): Promise<Array<object>>;
    ReadTeamplate(Option?:object & {title?:string,type_title?:string,note?:string,isparam?:string},map?: {[key:string]:any}): string
    Run(code: string,Option?:object & {title?:string,type_title?:string,note?:string,isparam?:string},map?: {[key:string]:any}): string
    ReadMeOnline(router?:ROUTER_INTERFACE,url?:string,URL?:string,req?:Http2ServerRequest,res?:Http2ServerResponse,data?:object):void
}