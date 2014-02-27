'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('compose', function(){
    var trimL = function(a){ return a.replace(/^[ ]+/, '') }
    var trimR = function(a){ return a.replace(/[ ]+$/, '') }
    var upperCaseTrim = _.compose(trimL, trimR, _.invoke('toUpperCase'));

    it('should should work as expected', function(){
        a.equal(upperCaseTrim(' abc '), 'ABC');
    });

    it('should return a curried function as a result', function(){
        var reduceFromThenTrim = _.compose(trimL, trimR, _.reduceFrom);
        var catTrim = reduceFromThenTrim(function(a, b){ return a + b }, '');

        a.equal(reduceFromThenTrim.length, 3);
        a.equal(catTrim.length, 1);

        a.equal(catTrim([' ', '3', '4', 'a', ' ', 'c', ' ']), '34a c');
    });
});

describe('negate', function(){
    it('should flip falsey returns to true, and truthy returns to false', function(){
        var isTruthy = function(a){ return !!a };
        var isFalsey = _.negate(isTruthy);

        a.equal(isFalsey(0), true);
        a.equal(isFalsey(1), false);
        a.equal(isFalsey(''), true);
        a.equal(isFalsey('abc'), false);
        a.equal(isFalsey({}), false);
    });
});

describe('flip', function(){
    it('should flip and curry', function(){
        var cat = function(a, b){ return a + b };
        var flipCat = _.flip(cat);
        var suffixIsm = flipCat('ism');

        a.equal(suffixIsm('loyal'), 'loyalism');
    });
});

describe('identity', function(){
    it('should return the value passed in', function(){
        var o = {}
        a.equal(_.identity(o), o);
    });
});

describe('tap', function(){
    it('should execute the function given for the side effect, and return the second val', function(){
        var logs = [];
        var log = function(a){ logs.push(a) };

        var identityLog = _.tap(log);

        a.equal(identityLog('a'), 'a');
        a.equal(logs[0], 'a');
    });
});

describe('constant', function(){
    it('should return a function that will return the value passed when called', function(){
        a.equal(_.constant('a')(), 'a')
    });
});

describe('curry', function(){
    it('should be exported (same as npm/curry)', function(){
        a.ok('curry' in _);
    });
});
