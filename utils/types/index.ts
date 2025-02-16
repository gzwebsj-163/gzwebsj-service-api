import {UtilsError} from "../index";
/*match(regx,value)*/
export const match = (regx: RegExp, value: any): boolean => {
    return new RegExp(regx).test(value)
};

/*match IsUndefine(value)*/
export const isUndefine = (value: any): boolean => {
    return match(/undefine/i, typeof value);
};

/*match IsNull(value)*/
export const isNull = (value: any): boolean => {
    return match(/null/i, typeof value);
};

/*match IsString(value)*/
export const isString = (value: any): boolean => {
    return match(/string/i, typeof value);
};

/*match IsNumber(value)*/
export const isNumber = (value: any): boolean => {
    return match(/number/i, typeof value);
};

/*match IsObject(value)*/
export const isObject = (value: any): boolean => {
    return match(/object/i, typeof value);
};

/*match IsFunction(value)*/
export const isFunction = (value: any): boolean => {
    return match(/function/i, typeof value);
};

/*match IsJSON(value)*/
export const isJson = (value: Promise<unknown>): boolean => {
    if (isString(value)) {
        const is = match(/^[\],:{}\s]*$|^".*?"$|^\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?$|^true$|^false$|^null$/, value);
        if (is) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/*match IsObjectObject(value)*/
export const isObjectObject = (value: any): boolean => {
    const regx = /^\[object\sObject\]$/i;
    if (regx.test(value)) {
        return true;
    } else {
        return false;
    }
};

export const TypeObjectStrValue = (value: object, key: string): boolean => {
    let is = false;
    if (isObject(value) && isString(key) && !isUndefine(value) && !isUndefine(key)) {
        for (let keys in value) {
            if (value.hasOwnProperty(keys) && key === keys) {
                is = true;
            }
        }
        return is;
    } else {
        UtilsError('is not the define');
        is = false;
        return is;
    }
};

export const TypeObjectNumValue = (value: object, key: string): boolean => {

    if (isObject(value) && isString(key) && !isUndefine(value) && !isUndefine(key)) {
        for (let keys in value) {
            if (value.hasOwnProperty(keys) && key === keys) {
                return true;
            }
        }
        return false;
    } else {
        UtilsError('is not the define');
        return false;
    }
};

export const TypeObjectAssgin = (value: any): object => {
    return Object.create(value);
};

export const TypeJson = (value: object): string => {
    return JSON.stringify(value,function(key,value){
        if (key === 'circularReference') {
            return undefined;
        }
        return value;
    });
};

export const TypeJsonParse = (value: string): object => {
    if (isObject(value)) {
        return JSON.parse(value);
    } else {
        return UtilsError('is not the object format')
    }
};


