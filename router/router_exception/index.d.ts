import error from 'node:events'
export interface Exception {
    ExceptionError(msg?: string, data?: object): Promise<Object<Array>>;
    ExceptionLevel(level?: number): Promise<Array<number>>;
    ExceptionGlobal(self?: Symbol): Promise<self<object>>;
    ExceptionHook(self?:Symbol):Promise<self<object>>;
}