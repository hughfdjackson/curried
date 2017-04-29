'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('map', () => {
    var mapInc = _.map(a => a + 1);

    it('should map over an array', () => {
        a.deepEqual(mapInc([1, 2, 3]), [2, 3, 4]);
    });

    it('should map over an object', () => {
        a.deepEqual(mapInc({ x: 1, y: 2, z: 3 }), { x: 2, y: 3, z: 4 });
    });

    it('accept unary functions', () => {
        var spy = sinon.spy();
        _.map(spy, [1]);
        _.map(spy, { x: 1 });
        a.ok(spy.alwaysCalledWithExactly(1));
    });
});


describe('filter', () => {
    var isString = a => typeof a === 'string';
    var filterString = _.filter(isString);

    it('should filter over an array', () => {
        a.deepEqual(filterString([1, 2, 'a', 3, 'b']), ['a', 'b']);
    });

    it('should filter over an object', () => {
        a.deepEqual(filterString({ x: 1, y: 2, z: 'a', a: 3, b: 'b' }), { z: 'a', b: 'b' });
    });

    it('accept unary functions', () => {
        var spy = sinon.spy();
        _.filter(spy, [1]);
        _.filter(spy, { x: 1 });
        a.ok(spy.alwaysCalledWithExactly(1));
    });
});

describe('reject', () => {
    var isString = a => typeof a === 'string';
    var filterNotString = _.reject(isString);

    it('should reject over an array', () => {
        a.deepEqual(filterNotString([1, 2, 'a', 3, 'b']), [1, 2, 3]);
    });

    it('should reject over an object', () => {
        a.deepEqual(filterNotString({ x: 1, y: 2, z: 'a', a: 3, b: 'b' }), { x: 1, y: 2, a: 3 });
    });

    it('accept unary functions', () => {
        var spy = sinon.spy();
        _.reject(spy, [1]);
        _.reject(spy, { x: 1 });
        a.ok(spy.alwaysCalledWithExactly(1));
    });

});

describe('every', () => {
    var isString = a => typeof a === 'string';
    var allString = _.every(isString);

    it('should return true if the predicate is true for all array members', () => {
        a.ok(!allString([1, 2, 'a', 3, 'b']));
        a.ok(allString(['a', '3', 'b']));
    });

    it('should return true if the predicate is true for all object members', () => {
        a.ok(!allString({ x: 1, y: 2, z: 'a' }));
        a.ok(allString({ x: '1', y: 'b', z: 'a' }));
    });

    it('accept unary functions', () => {
        var spy = sinon.spy();
        _.every(spy, [1]);
        _.every(spy, { x: 1 });
        a.ok(spy.alwaysCalledWithExactly(1));
    });

});

describe('some', () => {
    var isString = a => typeof a === 'string';
    var someString = _.some(isString);

    it('should return true if the predicate is true for all array members', () => {
        a.ok(someString([1, 2, 'a', 3, 'b']));
        a.ok(!someString([3, 4]));
    });

    it('should return true if the predicate is true for all object members', () => {
        a.ok(someString({ x: 1, y: 2, z: 'a' }));
        a.ok(!someString({ x: 1, y: 2, z: 3 }));
    });

    it('accept unary functions', () => {
        var spy = sinon.spy();
        _.some(spy, [1]);
        _.some(spy, { x: 1 });
        a.ok(spy.alwaysCalledWithExactly(1));
    });
});

describe('reduce', () => {
    var cat = _.reduce((a, b) => a + b);
    var sum = cat;

    it('reducing over an array', () => {
        a.equal(cat(['a', 'b', 'c']), 'abc');
    });

    it('reduce over an object', () => {
        a.equal(sum({ x: 1, y: 2, z: 3 }), 6);
    });
});

describe('reduceRight', () => {
    var reverseCat = _.reduceRight((a, b) => a + b)
    var sum = reverseCat;

    it('reducing over an array', () => {
        a.equal(reverseCat(['a', 'b', 'c']), 'cba');
    });

    it('reduce over an object', () => {
        a.equal(sum({ x: 1, y: 2, z: 3 }), 6);
    });
});

describe('reduceFrom', () => {
    var prefix = 'super awesome ';
    var catWithPrefix = _.reduceFrom((a, b) => a + b, prefix);
    var sumFrom3 = _.reduceFrom((a, b) => a + b, 3)

    it('should expect a seed - reducing over an array', () => {
        a.equal(catWithPrefix(['a', 'b', 'c']), prefix + 'abc');
    });

    it('should expect a seed - reduce over an object', () => {
        a.equal(sumFrom3({ x: 1, y: 2, z: 3 }), 9);
    });
});

describe('reduceRightFrom', () => {
    var prefix = 'super awesome ';
    var reverseCatWithPrefix = _.reduceRightFrom((a, b) => a + b, prefix);
    var sumFrom3 = _.reduceRightFrom((a, b) => a + b, 3)

    it('should expect a seed - reducing over an array', () => {
        a.equal(reverseCatWithPrefix(['a', 'b', 'c']), prefix + 'cba');
    });

    it('should expect a seed - reduce over an object', () => {
        a.equal(sumFrom3({ x: 1, y: 2, z: 3 }), 9);
    });
});
