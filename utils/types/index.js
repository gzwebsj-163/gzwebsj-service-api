"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeJsonParse = exports.TypeJson = exports.TypeObjectAssgin = exports.TypeObjectNumValue = exports.TypeObjectStrValue = exports.isObjectObject = exports.isJson = exports.isFunction = exports.isObject = exports.isNumber = exports.isString = exports.isNull = exports.isUndefine = exports.match = void 0;
var index_1 = require("../index");
/*match(regx,value)*/
var match = function (regx, value) {
    return new RegExp(regx).test(value);
};
exports.match = match;
/*match IsUndefine(value)*/
var isUndefine = function (value) {
    return (0, exports.match)(/undefine/i, typeof value);
};
exports.isUndefine = isUndefine;
/*match IsNull(value)*/
var isNull = function (value) {
    return (0, exports.match)(/null/i, typeof value);
};
exports.isNull = isNull;
/*match IsString(value)*/
var isString = function (value) {
    return (0, exports.match)(/string/i, typeof value);
};
exports.isString = isString;
/*match IsNumber(value)*/
var isNumber = function (value) {
    return (0, exports.match)(/number/i, typeof value);
};
exports.isNumber = isNumber;
/*match IsObject(value)*/
var isObject = function (value) {
    return (0, exports.match)(/object/i, typeof value);
};
exports.isObject = isObject;
/*match IsFunction(value)*/
var isFunction = function (value) {
    return (0, exports.match)(/function/i, typeof value);
};
exports.isFunction = isFunction;
/*match IsJSON(value)*/
var isJson = function (value) {
    if ((0, exports.isString)(value)) {
        var is = (0, exports.match)(/^[\],:{}\s]*$|^".*?"$|^\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?$|^true$|^false$|^null$/, value);
        if (is) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};
exports.isJson = isJson;
/*match IsObjectObject(value)*/
var isObjectObject = function (value) {
    var regx = /^\[object\sObject\]$/i;
    if (regx.test(value)) {
        return true;
    }
    else {
        return false;
    }
};
exports.isObjectObject = isObjectObject;
var TypeObjectStrValue = function (value, key) {
    var is = false;
    if ((0, exports.isObject)(value) && (0, exports.isString)(key) && !(0, exports.isUndefine)(value) && !(0, exports.isUndefine)(key)) {
        for (var keys in value) {
            if (value.hasOwnProperty(keys) && key === keys) {
                is = true;
            }
        }
        return is;
    }
    else {
        (0, index_1.UtilsError)('is not the define');
        is = false;
        return is;
    }
};
exports.TypeObjectStrValue = TypeObjectStrValue;
var TypeObjectNumValue = function (value, key) {
    if ((0, exports.isObject)(value) && (0, exports.isString)(key) && !(0, exports.isUndefine)(value) && !(0, exports.isUndefine)(key)) {
        for (var keys in value) {
            if (value.hasOwnProperty(keys) && key === keys) {
                return true;
            }
        }
        return false;
    }
    else {
        (0, index_1.UtilsError)('is not the define');
        return false;
    }
};
exports.TypeObjectNumValue = TypeObjectNumValue;
var TypeObjectAssgin = function (value) {
    return Object.create(value);
};
exports.TypeObjectAssgin = TypeObjectAssgin;
var TypeJson = function (value) {
    return JSON.stringify(value, function (key, value) {
        if (key === 'circularReference') {
            return undefined;
        }
        return value;
    });
};
exports.TypeJson = TypeJson;
var TypeJsonParse = function (value) {
    if ((0, exports.isObject)(value)) {
        return JSON.parse(value);
    }
    else {
        return (0, index_1.UtilsError)('is not the object format');
    }
};
exports.TypeJsonParse = TypeJsonParse;
