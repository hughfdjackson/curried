'use strict';

var curry = require('curry');

// Number, [a] -> [a]
var take = curry(function(num, arr){
    return arr.slice(0, num);
});

// [a] -> [a]
var initial = function(a){ return a.slice(0, a.length - 1) }

// [a] -> a
var last = function(a){ 
    if ( a.length > 0 ) return a[a.length - 1];
    else return undefined;
}

// [a] -> a
var head = function(a){ return a[0] };

// [a] -> [a]
var tail = function(a){ return a.slice(1) };

module.exports = { 
    take: take,
    initial: initial,
    last: last,
    head: head,
    tail: tail
}