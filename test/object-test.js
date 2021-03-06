'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('invoke', function(){
    var toString = _.invoke('toString');

    it('should invoke the method specified', function(){
        ['abc', 1, true, {}].forEach(function(val){
            a.equal(toString(val), val.toString())
        });
    });
});

describe('invokeWith', function(){
    var mapInc = _.invokeWith('map', [function(a){ return a + 1 }]);

    it('should invoke a method with the given list of arguments', function(){
        var inced = mapInc([1, 2, 3]);
        a.deepEqual(inced, [2, 3, 4]);
    });
});

describe('get', function(){
    var getX = _.get('x');

    it('should retrieve a property from an object', function(){
        a.equal(getX({ x: 2 }), 2);
    });
});


describe('pick', function(){
    var pick2DCoords = _.pick(['x', 'y']);
    var coords3D = { x: 1, y: 2, z: 200 };

    it('should retrieve an object of properties from an object', function(){
        a.deepEqual(pick2DCoords(coords3D), { x: 1, y: 2 });
    });
});

describe('combine', function(){
    var defaults = _.combine({ firstName: 'joe', lastName: 'bloggs' });

    it('should merge the last argument over the first with preference', function(){
        var nameChange = defaults({ lastName: 'shufflebottom'});
        a.deepEqual(nameChange, { firstName: 'joe', lastName: 'shufflebottom' });
    });
});


describe('keys', function(){
    it('should get an array of keys from an object', function(){
        a.deepEqual(_.keys({ x: 1, y: 2, z: 3 }), ['x', 'y', 'z']);
    });
});

describe('values', function(){
    it('should get an array of values from an object', function(){
        a.deepEqual(_.values({ x: 1, y: 2, z: 3 }), [1, 2, 3]);
    });
});
