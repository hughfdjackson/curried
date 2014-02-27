'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('take', function(){
    var take5 = _.take(5);

    it('should take the first n of an array', function(){
        a.deepEqual(take5([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), [1, 2, 3, 4, 5]);
    });
});

describe('head', function(){
    it('should take the first element of an array', function(){
        a.equal(_.head([1, 2, 3]), 1);
        a.equal(_.head([]), undefined);
    });
});

describe('tail', function(){
    it('should give an array with all but the first member', function(){
        a.deepEqual(_.tail([1, 2, 3]), [2, 3]);
        a.deepEqual(_.tail([1]), []);
        a.deepEqual(_.tail([]), []);
    });
});

describe('initial', function(){
    it('should give an array with all but the last member', function(){
        a.deepEqual(_.initial([1, 2, 3]), [1, 2]);
        a.deepEqual(_.initial([1]), []);
        a.deepEqual(_.initial([]), []);
    });
});

describe('last', function(){
    it('should take the last element of an array', function(){
        a.deepEqual(_.last([1, 2, 3]), 3)
        a.deepEqual(_.last([]), undefined);

        var trickArr = [];
        trickArr[-1] = 'fake value';

        a.deepEqual(_.last(trickArr), undefined);
    });
});
