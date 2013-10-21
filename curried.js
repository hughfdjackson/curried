'use strict';

var curry = require('curry');

var unary = function(fn){ return function(a){ return fn(a) } }
var binary = function(fn){ return function(a, b){ return fn(a, b) } }
var negate = function(fn){ return function(a){ return !fn(a) } }

var toArray = function(arrayLike){ return Array.prototype.slice.call(arrayLike) }
var body = function(a){ return a.slice(0, a.length - 1) }
var last = function(a){ return a[a.length - 1] }

// Interfaces:
// Functor - has a map method
// Reducible - has a reduce and reduceRight method
// Filterable - has a filter method

// (a -> b), Functor c -> Functor c
var map = curry(function(fn, val){
	return val.map(unary(fn));
});

// (a, b -> c), d, Reducible e -> c
var reduce = curry(function(fn, val){
	return val.reduce(binary(fn));
});

// (a, b -> c), d, Reducible e -> c
var reduceRight = curry(function(fn, val){
	return val.reduceRight(binary(fn));
});

// (a, b -> c), d, Reducible e -> c
var reduceFrom = curry(function(fn, seed, val){
	return val.reduce(binary(fn), seed);
});

// (a, b -> c), d, Reducible e -> c
var reduceRightFrom = curry(function(fn, seed, val){
	return val.reduceRight(binary(fn), seed);
});

// (a -> Boolean), Filterable b -> Filterable b
var filter = curry(function(fn, val){
	return val.filter(unary(fn));
});

// (a -> Boolean), Filterable b -> Filterable b
var reject = curry(function(fn, val){
	return val.filter(negate(fn));
});

// String, val -> val
var invoke = curry(function(method, val){
	return val[method]();
});

// String, [val], val -> val
var invokeWith = curry(function(method, args, val){
	return val[method].apply(val, args);
});

// fn, fn ... -> fn
var compose = function(){
	var fns = toArray(arguments);
	var lastFn = last(fns);
	var bodyFns = body(fns);
	return curry.to(lastFn.length, function(){
		var seed = lastFn.apply(null, arguments);
		return bodyFns.reduceRight(function(val, fn){ return fn(val) }, seed);
	});
};

// String, val -> val
var get = curry(function(prop, val){
	return val[prop];
});

module.exports = {
	map: map,
	reduce: reduce,
	reduceRight: reduceRight,
	reduceFrom: reduceFrom,
	reduceRightFrom: reduceRightFrom,
	filter: filter,
	reject: reject,
	invoke: invoke,
	invokeWith: invokeWith,
	compose: compose,
	get: get
}
