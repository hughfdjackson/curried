'use strict';

var curry = require('curry');

var shallowClone = o => { 
    var clone = {};
    for ( var p in o ) if ( o.hasOwnProperty(p)) clone[p] = o[p];
    return clone;
}


// String, val -> val
var invoke = curry((method, val) => val[method]());

// String, [val], val -> val
var invokeWith = curry((method, args, val) => val[method](...args));

// String, Object-like -> Object-like
var get = curry((prop, val) => val[prop]);

// [String], Object -> Object
var pick = curry((props, val) => { 
    var addProp = (acc, prop) => { 
        acc[prop] = val[prop]; 
        return acc; 
    }

    return props.reduce(addProp, {});
});

// Object, Object -> Object
var combine = curry((o1, o2) => {
    o1 = shallowClone(o1);
    for ( var p in o2 ) if ( o2.hasOwnProperty(p) ) o1[p] = o2[p];
    return o1;
});

var keys = o => {
    var a = [];
    for ( var p in o ) if ( o.hasOwnProperty(p) ) a.push(p);
    return a;
}

var values = o => {
    var a = [];
    for ( var p in o ) if ( o.hasOwnProperty(p) ) a.push(o[p]);
    return a;
}

module.exports = {
    invoke,
    invokeWith,
    get,
    pick,
    combine,
    keys,
    values
}