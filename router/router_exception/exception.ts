import error from 'node:events'
const Exception = require('.');
'user strtic'
const err = new Exception();
export class ROUTER_EXCPTION extends Error {
    private ErrorMode?: object = {};
    private ErrorClass?: Error = new Error();
    private ErrorPush: any;
    private ErrorSet: any;
    private ErrorGet: any;
    private ErrorData?: object = {};
    private ErrorFill: boolean = false;
    private ErrorKill: boolean = false;
    private ErrorHandler: number = 0;
    private ErrorBuffer?: Array<number> = [];
    private ErrorSetBuffer?: Array<number> = [];
    constructor() {
        super();
        this.ErrorBuffer;
        this.ErrorData;
        this.ErrorGet;
        this.ErrorFill;
        this.ErrorHandler;
        this.ErrorKill;
        this.ErrorMode;
        this.ErrorPush;
        this.ErrorSet;
        this.ErrorSetBuffer;
        this.ErrorClass
    }
    public Handler(handler: number): number {
        this.ErrorHandler = handler;
        return this.ErrorHandler;
    };
    public ExceptionHandler(handler: number): undefined {
        (function (e) {
            try {
                e = Error.caller(handler);
            } catch (e) {
                console.error(e);
            }
        })()
    };
    public ExceptionErrorMode(mode: object, handler: number) {
        this.ErrorMode = mode;
        try {
            this.Handler.bind(mode);
            let i = 0;
            for (i; i < this.ErrorHandler; ++i) {
                this.ErrorData = mode;
                this.ErrorHandler = i;
                if (i > this.ErrorHandler) break;
                this.ErrorBuffer?.push(i);
            }
            this.ErrorHandler = handler;
        } catch (e) {
            console.log(e);
        }
    }
    public ExceptionErrorPush(value: any): any {
        try {
            this.ErrorData = value;
            this.ErrorGet = value;
            this.ErrorSet = value;
        } catch (e) {
            console.log(e);
        }
        return this;
    }
}