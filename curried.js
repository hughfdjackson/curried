'use strict';

var curry = require('curry');
var r = require('restrictary');
var unary = r.unary, binary = r.binary;

var toArray = function(arrayLike){ return Array.prototype.slice.call(arrayLike) }
var shallowClone = function(o){ 
	var clone = {};
	for ( var p in o ) if ( o.hasOwnProperty(p)) clone[p] = o[p];
	return clone;
}

//---- POLYMORPHIC ----// 

// Interfaces:
// Functor - has a map method
// Reducible - has a reduce and reduceRight method
// Filterable - has a filter method

// (a -> b), Functor c -> Functor c
var map = curry(function(fn, val){
	return val.map(unary(fn));
});

// (a, b -> c), Reducible d -> c
var reduce = curry(function(fn, val){
	return val.reduce(binary(fn));
});

// (a, b -> c), Reducible d -> c
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


//---- FUNCTION ----// 

// fn, fn ... -> fn
var compose = function(){
	var fns = toArray(arguments);
	var tailFn = tail(fns);
	var initialFns = initial(fns);
	return curry.to(tailFn.length, function(){
		var seed = tailFn.apply(null, arguments);
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

//--- OBJECT, or Object-like ---//

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


//--- Array, or Array-like ---//
var take = curry(function(num, arr){
	return arr.slice(0, num);
});

var initial = function(a){ return a.slice(0, a.length - 1) }
var last = function(a){ return a.slice(1) };

var head = function(a){ return a[0] };
var tail = function(a){ 
	if ( a.length > 0 ) return a[a.length - 1];
	else return undefined;
}

module.exports = {
	map: map,
	reduce: reduce,
	reduceRight: reduceRight,
	reduceFrom: reduceFrom,
	reduceRightFrom: reduceRightFrom,
	filter: filter,
	reject: reject,

	compose: compose,
	negate: negate,
	identity: identity,
	constant: constant,
	flip: flip,
	tap: tap,

	invoke: invoke,
	invokeWith: invokeWith,
	get: get,
	pick: pick,
	combine: combine,

	take: take, 
	initial: initial,
	last: last,
	head: head,
	tail: tail
}