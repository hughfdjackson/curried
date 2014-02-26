var curry = require('curry');
var r = require('restrictary');
var unary = r.unary, binary = r.binary;

var object = require('./object');
var negate = require('./function').negate;

var isArray = Array.isArray || function(val){ return Object.prototype.toString.call(val) === '[object Array]' };

var mapObject = function(o, fn){
    var r = {};
    for ( var p in o ) if ( o.hasOwnProperty(p) ) r[p] = fn(o[p]);
    return r;
}

var filterObject = function(o, fn){
    var r = {};
    for ( var p in o ) if ( o.hasOwnProperty(p) && fn(o[p]) ) r[p] = o[p];
    return r;
}

var everyObject = function(o, fn){
    for ( var p in o ) if ( o.hasOwnProperty(p) && !fn(o[p]) ) return false;
    return true;
}

var someObject = function(o, fn){
    for ( var p in o ) if ( o.hasOwnProperty(p) && fn(o[p]) ) return true;
    return false;
}

var reduceFromObject = function(o, fn, val){
    return object.values(o).reduce(fn, val);
}

var reduceObject = function(o, fn){
    return object.values(o).reduce(fn);
}

//---- COLLECTION ----// 

// (a -> b), Collection -> Collection
var map = curry(function(fn, val){
    fn = unary(fn);

    if ( isArray(val) ) return val.map(fn)
    else return mapObject(val, fn);
});

// (a -> Boolean), Collection -> Collection
var filter = curry(function(fn, val){
    fn = unary(fn);

    if ( isArray(val) ) return val.filter(fn);
    else return filterObject(val, fn);
});

// (a -> Boolean), Collection -> Collection
var reject = curry(function(fn, val){
    return filter(negate(fn), val);
});

// (a -> Boolean), Collection -> Boolean
var every = curry(function(fn, val){ 
    fn = unary(fn);

    if ( isArray(val) ) return val.every(fn);
    else return everyObject(val, fn);
});

// (a -> Boolean), Collection -> Boolean
var some = curry(function(fn, val){ 
    fn = unary(fn);

    if ( isArray(val) ) return val.some(fn);
    else return someObject(val, fn);
})


// (a, b -> c), Collection -> c
var reduce = curry(function(fn, val){
    fn = binary(fn);

    if ( isArray(val) ) return val.reduce(fn);
    else return reduceObject(val, fn);
});

// (a, b -> c), Collection -> c
var reduceRight = curry(function(fn, val){
    fn = binary(fn);

    if ( isArray(val) ) return val.reduceRight(fn);
    else return reduceObject(val, fn);
});

// (a, b -> c), d, Collection -> c
var reduceFrom = curry(function(fn, seed, val){
    fn = binary(fn);

    if ( isArray(val) ) return val.reduce(fn, seed);
    else return reduceFromObject(val, fn, seed);
});

// (a, b -> c), d, Collection -> c
var reduceRightFrom = curry(function(fn, seed, val){
    fn = binary(fn);

    if ( isArray(val) ) return val.reduceRight(fn, seed);
    else return reduceFromObject(val, fn, seed);
});

module.exports = { 
    map: map,
    filter: filter,
    reject: reject,
    every: every,
    some: some, 
    reduce: reduce,
    reduceRight: reduceRight, 
    reduceFrom: reduceFrom,
    reduceRightFrom: reduceRightFrom
}