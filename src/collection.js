var curry = require('curry');
var r = require('restrictary');
var unary = r.unary;
var binary = r.binary;

var object = require('./object');
var negate = require('./function').negate;

var isArray = Array.isArray || (val => Object.prototype.toString.call(val) === '[object Array]');

var mapObject = (o, fn) => {
    var r = {};
    for ( var p in o ) if ( o.hasOwnProperty(p) ) r[p] = fn(o[p]);
    return r;
}

var filterObject = (o, fn) => {
    var r = {};
    for ( var p in o ) if ( o.hasOwnProperty(p) && fn(o[p]) ) r[p] = o[p];
    return r;
}

var everyObject = (o, fn) => {
    for ( var p in o ) if ( o.hasOwnProperty(p) && !fn(o[p]) ) return false;
    return true;
}

var someObject = (o, fn) => {
    for ( var p in o ) if ( o.hasOwnProperty(p) && fn(o[p]) ) return true;
    return false;
}

var reduceFromObject = (o, fn, val) => object.values(o).reduce(fn, val)

var reduceObject = (o, fn) => object.values(o).reduce(fn)

//---- COLLECTION ----// 

// (a -> b), Collection -> Collection
var map = curry((fn, val) => {
    fn = unary(fn);

    if ( isArray(val) ) return val.map(fn)
    else return mapObject(val, fn);
});

// (a -> Boolean), Collection -> Collection
var filter = curry((fn, val) => {
    fn = unary(fn);

    if ( isArray(val) ) return val.filter(fn);
    else return filterObject(val, fn);
});

// (a -> Boolean), Collection -> Collection
var reject = curry((fn, val) => filter(negate(fn), val));

// (a -> Boolean), Collection -> Boolean
var every = curry((fn, val) => { 
    fn = unary(fn);

    if ( isArray(val) ) return val.every(fn);
    else return everyObject(val, fn);
});

// (a -> Boolean), Collection -> Boolean
var some = curry((fn, val) => { 
    fn = unary(fn);

    if ( isArray(val) ) return val.some(fn);
    else return someObject(val, fn);
})


// (a, b -> c), Collection -> c
var reduce = curry((fn, val) => {
    fn = binary(fn);

    if ( isArray(val) ) return val.reduce(fn);
    else return reduceObject(val, fn);
});

// (a, b -> c), Collection -> c
var reduceRight = curry((fn, val) => {
    fn = binary(fn);

    if ( isArray(val) ) return val.reduceRight(fn);
    else return reduceObject(val, fn);
});

// (a, b -> c), d, Collection -> c
var reduceFrom = curry((fn, seed, val) => {
    fn = binary(fn);

    if ( isArray(val) ) return val.reduce(fn, seed);
    else return reduceFromObject(val, fn, seed);
});

// (a, b -> c), d, Collection -> c
var reduceRightFrom = curry((fn, seed, val) => {
    fn = binary(fn);

    if ( isArray(val) ) return val.reduceRight(fn, seed);
    else return reduceFromObject(val, fn, seed);
});

module.exports = { 
    map,
    filter,
    reject,
    every,
    some, 
    reduce,
    reduceRight, 
    reduceFrom,
    reduceRightFrom
}