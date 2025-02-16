import { isString, isUndefine } from "./types";
/*Error message output*/
/* readme.md
* title:'UtilsError'
* parse: [{name:value,note:错误信息输出,type:string,isparam:true}]
* isparam:'true'
*/
export const UtilsError = (value: string): any => {
    if (isUndefine(value) && !isString(value)) return false;
    console.log("Errro Msg:" + value);
};
/*Success message output*/
/* readme.md
* title:'UtilsSuccess'
* parse: [{name:value,note:成功信息输出,type:string,isparam:true}]
* isparam:'true'
*/
export const UtilsSuccess = (value: string): any => {
    console.log('Success Msg:' + value);
};
/*Warring message output*/
/* readme.md
* title:'UtilsWarring'
* parse: [{name:value,note:警告信息输出,type:string,isparam:true}]
* isparam:'true'
*/
export const UtilsWarring = (value: string): any => {
    console.log("Warring Msg:" + value);
};
