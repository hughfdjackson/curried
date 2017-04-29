'use strict';

var curry = require('curry');

// Number, [a] -> [a]
var take = curry((num, arr) => arr.slice(0, num));

// [a] -> [a]
var initial = a => a.slice(0, a.length - 1)

// [a] -> a
var last = a => { 
    if ( a.length > 0 ) return a[a.length - 1];
    else return undefined;
}

// [a] -> a
var head = a => a[0];

// [a] -> [a]
var tail = a => a.slice(1);

module.exports = { 
    take,
    initial,
    last,
    head,
    tail
}