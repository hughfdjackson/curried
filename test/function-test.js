'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('compose', function(){
    var prependWith = _.curry(function(a, b){ return a + b });
    var addSpace = _.curry(function(str){ return str + ' ' });
    var appendWith = _.flip(prependWith);
    var shout = _.invoke('toUpperCase');
    var hellYea = _.compose(appendWith('hell yea!'), addSpace, appendWith('!!!'), shout);

    it('should chain the return value from right to left through the functions provided', function(){
        a.equal(hellYea('functions'), 'FUNCTIONS!!! hell yea!');
    });

    it('should return a curried function as a result', function(){
        var hellYeaWithPrepend = _.compose(hellYea, prependWith);
        var hellYeaWithLeadingWoo = hellYeaWithPrepend('Woo! ');

        a.equal(hellYeaWithLeadingWoo('functions'), 'WOO! FUNCTIONS!!! hell yea!');
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
        a.equal(_.curry, require('curry'));
    });
});
