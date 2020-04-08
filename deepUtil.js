"use strict";

class deepUtil{
    constructor(){}

    static merge(...targets){
        let mergedObject = {};
        const merge = function(source, mergedObject){
            let keyArray = Object.getOwnPropertyNames(source);
            for(let prop of keyArray){
                if(
                    source.hasOwnProperty(prop) &&
                    source[prop] !== null
                ){
                    if(typeof source[prop] === "object"){
                        if(!mergedObject.hasOwnProperty(prop))
                            mergedObject[prop] = {};

                        merge(source[prop], mergedObject[prop]);
                    }else if(typeof source[prop] !== "function")
                        mergedObject[prop] = source[prop];
                }
            }
        };

        for(let target of targets)
            merge(target, mergedObject);

        return mergedObject;
    }

    static copy(source){
        let parsedString = ``;
        try{
            parsedString = JSON.stringify(source);
        }catch(err){
            throw err;
        }

        return JSON.parse(parsedString);
    }

    static freeze(source){
        Object.freeze(source);

        let keyArray = Object.getOwnPropertyNames(source);
        for(let prop of keyArray){
            if(
                source.hasOwnProperty(prop) &&
                source[prop] !== null &&
                (typeof source[prop] === "object" || typeof source[prop] === "function") &&
                !Object.isFrozen(source[prop])
            ){
                deepUtil.freeze(source[prop]);
            }
        }

        return source;
    }

    static check(source, types, repeat){
        let result = {
            error: false,
            notFound: {},
            typeError: {}
        };
    
        let repeatRegex = (repeat instanceof RegExp) ? repeat : /\[\]$/;
    
        const typeCheck = function(type, value){
            const typeList = {
                isNumber: function(value){
                    return (typeof value === 'number');
                },
                isString: function(value){
                    return (typeof value === 'string');
                },
                isBoolean: function(value){
                    return (typeof value === 'boolean');
                },
                isNull: function(value){
                    return (value === null);
                },
                isUndefined: function(value){
                    return (typeof value === 'undefined');
                },
                isNaN: function(value){
                    return Number.isNaN(value);
                }
            };
    
            const definedType = [
                "number",
                "string",
                "boolean",
                "null",
                "undefined",
                "nan"
            ];
    
            let definedTypeAndArray = [].concat(
                definedType,
                definedType.map(
                    typeString => {
                        return `${typeString}[]`;
                    }
                )
            );
    
            if(!definedTypeAndArray.includes(type))
                return false;
    
            const functionName = `is${type.charAt(0).toUpperCase()}${type.slice(1)}`.replace(/\[\]$/, '');
    
            if(/.*\[\]$/.test(type)){
                if(!Array.isArray(value))
                    return false;
                else{
                    for(let currentValue of value){
                        if(!typeList[functionName](currentValue))
                            return false;
                    }
    
                    return true;
                }
            }else
                return typeList[functionName](value);
        }
    
        const check = function(types, source, notFound, typeError){
            let keyArray = Object.getOwnPropertyNames(types);
    
            for(let prop of keyArray){
    
                if(repeatRegex.test(prop)){
                    let keyName = String(prop).replace(repeatRegex, '');
    
                    if(source.hasOwnProperty(keyName)){
    
                        if(
                            Array.isArray(source[keyName])
                        ){
                            typeError[keyName] = [];
                            notFound[keyName] = [];
    
                            for(let unit of source[keyName]){
                                let recursiveResult = deepUtil.check(unit, types[prop], repeatRegex);
                                if(recursiveResult.error){
                                    typeError[keyName].push(recursiveResult.typeError);
                                    notFound[keyName].push(recursiveResult.notFound);
                                    result.error = true;
                                }else{
                                    typeError[keyName].push(recursiveResult.typeError);
                                    notFound[keyName].push(recursiveResult.notFound);
                                }
                            }
                        }else{
                            typeError[keyName] = true;
                            result.error = true;
                        }
                    }else{
                        notFound[keyName] = true;
                        result.error = true;
                    }
                }else{
                    if(source.hasOwnProperty(prop)){
                        if(
                            typeof types[prop] === "object" &&
                            types[prop] !== null
                        ){
                            notFound[prop] = {};
                            typeError[prop] = {};
    
                            check(types[prop], source[prop], notFound[prop], typeError[prop]);
                        }else if(typeof types[prop] !== "function"){
                            let isDesignatedType = typeCheck(types[prop], source[prop]);
                            notFound[prop] = false;
    
                            if(isDesignatedType)
                                typeError[prop] = false;
                            else{
                                typeError[prop] = true;
                                result.error = true;
                            }
                        }
                    }else{
                        notFound[prop] = true;
                        result.error = true;
                    }
                }
            }
        }
    
        check(types, source, result.notFound, result.typeError);
    
        return result;
    }
}

module.exports = deepUtil;
