'use strict';

var curry = require('curry');
var arr = require('./array');

var toArray = arrayLike => Array.prototype.slice.call(arrayLike)

// fn, fn ... -> fn
var compose = function(...args) {
    var fns = toArray(args);
    var lastFn = arr.last(fns);
    var initialFns = arr.initial(fns);
    return curry.to(lastFn.length, function(...args) {
        var seed = lastFn(...args);
        return initialFns.reduceRight((val, fn) => fn(val), seed);
    });
};

// fn, fn ... -> fn
var pipe = function(...args) {
    var reversedArgs = toArray(args).reverse();
    return compose(...reversedArgs);
}

var negate = curry((fn, a) => !fn(a));

// val -> val
var identity = val => val

// val -> (-> val)
var constant = val => () => val;

// ( a, b -> val ), b, a -> val
var flip = curry((fn, a, b) => fn(b, a));

// ( a -> ), a -> a
var tap = curry((fn, a) => {
    fn(a); return a;
});

module.exports = {
    compose,
    pipe,
    negate,
    identity,
    constant,
    flip,
    tap,
    curry
}
