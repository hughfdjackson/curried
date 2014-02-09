'use strict';

var collection = require('./src/collection');
var array = require('./src/array');
var object = require('./src/object');
var fn = require('./src/function');

var modules =  [collection, array, object, fn];

module.exports = modules.reduce(object.combine)
