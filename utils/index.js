"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsWarring = exports.UtilsSuccess = exports.UtilsError = void 0;
var types_1 = require("./types");
/*Error message output*/
/* readme.md
* title:'UtilsError'
* parse: [{name:value,note:错误信息输出,type:string,isparam:true}]
* isparam:'true'
*/
var UtilsError = function (value) {
    if ((0, types_1.isUndefine)(value) && !(0, types_1.isString)(value))
        return false;
    console.log("Errro Msg:" + value);
};
exports.UtilsError = UtilsError;
/*Success message output*/
/* readme.md
* title:'UtilsSuccess'
* parse: [{name:value,note:成功信息输出,type:string,isparam:true}]
* isparam:'true'
*/
var UtilsSuccess = function (value) {
    console.log('Success Msg:' + value);
};
exports.UtilsSuccess = UtilsSuccess;
/*Warring message output*/
/* readme.md
* title:'UtilsWarring'
* parse: [{name:value,note:警告信息输出,type:string,isparam:true}]
* isparam:'true'
*/
var UtilsWarring = function (value) {
    console.log("Warring Msg:" + value);
};
exports.UtilsWarring = UtilsWarring;
