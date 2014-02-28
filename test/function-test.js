'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('compose', function(){
    var appendWithHellYea = function(str){ return str + 'hell yea!' };
    var appendSpace = function(str){ return str + ' ' };
    var shout = function(str){ return str.toUpperCase() };
    var hellYea = _.compose(appendWithHellYea, appendSpace, shout);

    it('should chain the return value from right to left through the functions provided', function(){
        a.equal(hellYea('functions!'), 'FUNCTIONS! hell yea!');
    });

    it('should return a curried function as a result', function(){
        var prependWoo = function(str){ return 'Woo! ' + str };
        var hellYeaWithLeadingWoo = _.compose(hellYea, prependWoo);

        a.equal(hellYeaWithLeadingWoo('functions!'), 'WOO! FUNCTIONS! hell yea!');
    });
});

describe('pipe', function(){
    var appendWithHellYea = function(str){ return str + 'hell yea!' };
    var appendSpace = function(str){ return str + ' ' };
    var shout = function(str){ return str.toUpperCase() };
    var hellYea = _.pipe(shout, appendSpace, appendWithHellYea);

    it('should chain the return value from left to right through the functions provided', function(){
        a.equal(hellYea('functions!'), 'FUNCTIONS! hell yea!');
    });

    it('should return a curried function as a result', function(){
        var prependWoo = function(str){ return 'Woo! ' + str };
        var hellYeaWithLeadingWoo = _.pipe(prependWoo, hellYea);

        a.equal(hellYeaWithLeadingWoo('functions!'), 'WOO! FUNCTIONS! hell yea!');
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
        var prependWith = _.curry(function(a, b){ return a + b });
        var appendWith = _.flip(prependWith);
        var appendIsm = appendWith('ism');

        a.equal(appendIsm('functional'), 'functionalism');
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
