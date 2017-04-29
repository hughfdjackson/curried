'use strict';

var _ = require('../');
var a = require('assert');
var sinon = require('sinon');

describe('compose', () => {
    var appendWithHellYea = str => str + 'hell yea!';
    var appendSpace = str => str + ' ';
    var shout = str => str.toUpperCase();
    var hellYea = _.compose(appendWithHellYea, appendSpace, shout);

    it('should chain the return value from right to left through the functions provided', () => {
        a.equal(hellYea('functions!'), 'FUNCTIONS! hell yea!');
    });

    it('should return a curried function as a result', () => {
        var prependWoo = str => 'Woo! ' + str;
        var hellYeaWithLeadingWoo = _.compose(hellYea, prependWoo);

        a.equal(hellYeaWithLeadingWoo('functions!'), 'WOO! FUNCTIONS! hell yea!');
    });
});

describe('pipe', () => {
    var appendWithHellYea = str => str + 'hell yea!';
    var appendSpace = str => str + ' ';
    var shout = str => str.toUpperCase();
    var hellYea = _.pipe(shout, appendSpace, appendWithHellYea);

    it('should chain the return value from left to right through the functions provided', () => {
        a.equal(hellYea('functions!'), 'FUNCTIONS! hell yea!');
    });

    it('should return a curried function as a result', () => {
        var prependWoo = str => 'Woo! ' + str;
        var hellYeaWithLeadingWoo = _.pipe(prependWoo, hellYea);

        a.equal(hellYeaWithLeadingWoo('functions!'), 'WOO! FUNCTIONS! hell yea!');
    });
});

describe('negate', () => {
    it('should flip falsey returns to true, and truthy returns to false', () => {
        var isTruthy = a => !!a;
        var isFalsey = _.negate(isTruthy);

        a.equal(isFalsey(0), true);
        a.equal(isFalsey(1), false);
        a.equal(isFalsey(''), true);
        a.equal(isFalsey('abc'), false);
        a.equal(isFalsey({}), false);
    });
});

describe('flip', () => {
    it('should flip and curry', () => {
        var prependWith = _.curry((a, b) => a + b);
        var appendWith = _.flip(prependWith);
        var appendIsm = appendWith('ism');

        a.equal(appendIsm('functional'), 'functionalism');
    });
});

describe('identity', () => {
    it('should return the value passed in', () => {
        var o = {}
        a.equal(_.identity(o), o);
    });
});

describe('tap', () => {
    it('should execute the function given for the side effect, and return the second val', () => {
        var logs = [];
        var log = a => { logs.push(a) };

        var identityLog = _.tap(log);

        a.equal(identityLog('a'), 'a');
        a.equal(logs[0], 'a');
    });
});

describe('constant', () => {
    it('should return a function that will return the value passed when called', () => {
        a.equal(_.constant('a')(), 'a')
    });
});

describe('curry', () => {
    it('should be exported (same as npm/curry)', () => {
        a.equal(_.curry, require('curry'));
    });
});
