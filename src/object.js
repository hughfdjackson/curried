'use strict';

var curry = require('curry');

var shallowClone = function(o){ 
    var clone = {};
    for ( var p in o ) if ( o.hasOwnProperty(p)) clone[p] = o[p];
    return clone;
}


// String, val -> val
var invoke = curry(function(method, val){
    return val[method]();
});

// String, [val], val -> val
var invokeWith = curry(function(method, args, val){
    return val[method].apply(val, args);
});

// String, Object-like -> Object-like
var get = curry(function(prop, val){
    return val[prop];
});

// [String], Object -> Object
var pick = curry(function(props, val){ 
    var addProp = function(acc, prop){ 
        acc[prop] = val[prop]; 
        return acc; 
    }

    return props.reduce(addProp, {});
});

// Object, Object -> Object
var combine = curry(function(o1, o2){
    o1 = shallowClone(o1);
    for ( var p in o2 ) if ( o2.hasOwnProperty(p) ) o1[p] = o2[p];
    return o1;
});

var keys = function(o){
    var a = [];
    for ( var p in o ) if ( o.hasOwnProperty(p) ) a.push(p);
    return a;
}

var values = function(o){
    var a = [];
    for ( var p in o ) if ( o.hasOwnProperty(p) ) a.push(o[p]);
    return a;
}

module.exports = {
    invoke: invoke,
    invokeWith: invokeWith,
    get: get,
    pick: pick,
    combine: combine,
    keys: keys,
    values: values
}