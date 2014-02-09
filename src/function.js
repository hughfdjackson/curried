'use strict';

var curry = require('curry');
var arr = require('./array');

var toArray = function(arrayLike){ return Array.prototype.slice.call(arrayLike) }

// fn, fn ... -> fn
var compose = function(){
    var fns = toArray(arguments);
    var lastFn = arr.last(fns);
    var initialFns = arr.initial(fns);
    return curry.to(lastFn.length, function(){
        var seed = lastFn.apply(null, arguments);
        return initialFns.reduceRight(function(val, fn){ return fn(val) }, seed);
    });
};

var negate = curry(function(fn, a){ 
    return !fn(a);
});

// val -> val
var identity = function(val){
    return val;
}

// val -> (-> val)
var constant = function(val){
    return function(){ return val };
};

// ( a, b -> val ), b, a -> val
var flip = curry(function(fn, a, b){
    return fn(b, a);
});

// ( a -> ), a -> a
var tap = curry(function(fn, a){ 
    fn(a); return a;
});

module.exports = {
    compose: compose,
    negate: negate,
    identity: identity,
    constant: constant,
    flip: flip,
    tap: tap
}