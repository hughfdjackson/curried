var _ = require('../');
var a = require('assert');

describe('map', function(){
    var map = _.map;
    var mapInc = map(function(a){ return a + 1 });

    it('should map over an array', function(){
        a.deepEqual(mapInc([1, 2, 3]), [2, 3, 4]);
    })

    it('should restrict to unary', function(){
        var args;
        map(function(){ args = arguments }, [1]);
        a.equal(args.length, 1);
    });
});

describe('reduce', function(){
    var reduce = _.reduce;
    var cat = reduce(function(a, b){ return a + b });

    it('should not expect a seed', function(){
        a.equal(cat(['a', 'b', 'c']), 'abc');
    });

    it('should restrict to binary', function(){
        var args;
        reduce(function(){ args = arguments }, [1, 2]);
        a.equal(args.length, 2);
    });
});

describe('reduceRight', function(){
    var reduceRight = _.reduceRight;
    var reverseCat = reduceRight(function(a, b){ return a + b })

    it('should not expect a seed', function(){
        a.equal(reverseCat(['a', 'b', 'c']), 'cba');
    });

    it('should restrict to binary', function(){
        var args;
        reduceRight(function(){ args = arguments }, [1, 2]);
        a.equal(args.length, 2);
    });
});

describe('reduceFrom', function(){
    var reduceFrom = _.reduceFrom;
    var cat = reduceFrom(function(a, b){ return a + b }, '');

    it('should expect a seed', function(){
        a.equal(cat(['a', 'b', 'c']), 'abc');
    });

    it('should restrict to binary', function(){
        var args;
        reduceFrom(function(){ args = arguments }, 1, [1]);
        a.equal(args.length, 2);
    });
});

describe('reduceRightFrom', function(){
    var reduceRightFrom = _.reduceRightFrom;
    var reverseCat = reduceRightFrom(function(a, b){ return a + b }, '')

    it('should expect a seed', function(){
        a.equal(reverseCat(['a', 'b', 'c']), 'cba');
    });

    it('should restrict to binary', function(){
        var args;
        reduceRightFrom(function(){ args = arguments }, 1, [1]);
        a.equal(args.length, 2);
    });
});

describe('filter', function(){
    var filter = _.filter;
    var isString = function(a){ return typeof a === 'string' };
    var filterString = filter(isString);

    it('should filter', function(){
        a.deepEqual(filterString([1, 2, 'a', 3, 'b']), ['a', 'b']);
    });

    it('should restrict to unary', function(){
        var args;
        filter(function(){ args = arguments }, [1]);
        a.equal(args.length, 1);
    });
});

describe('reject', function(){
    var reject = _.reject;
    var isString = function(a){ return typeof a === 'string' };
    var filterNotString = reject(isString);

    it('should reject', function(){
        a.deepEqual(filterNotString([1, 2, 'a', 3, 'b']), [1, 2, 3]);
    });

    it('should restrict to unary', function(){
        var args;
        reject(function(){ args = arguments }, [1]);
        a.equal(args.length, 1);
    });
});

describe('invoke', function(){
    var invoke = _.invoke;
    var toString = invoke('toString');

    it('should invoke the method specified', function(){
        ['abc', 1, true, {}]
            .forEach(function(val){
                a.equal(toString(val), val.toString())
            });
    });
});

describe('compose', function(){
    var compose = _.compose;
    var trimL = function(a){ return a.replace(/^[ ]+/, '') }
    var trimR = function(a){ return a.replace(/[ ]+$/, '') }
    var upperCaseTrim = compose(trimL, trimR, _.invoke('toUpperCase'));

    it('should .. work', function(){
        a.equal(upperCaseTrim(' abc '), 'ABC');
    });

    it('should return a curried result', function(){
        var reduceFromThenTrim = compose(trimL, trimR, _.reduceFrom);
        var catTrim = reduceFromThenTrim(function(a, b){ return a + b }, '')
        a.equal(reduceFromThenTrim.length, 3);
        a.equal(catTrim.length, 1);

        a.equal(catTrim([' ', '3', '4', 'a', ' ', 'c', ' ']), '34a c');
    });
});

describe('get', function(){
    var get = _.get;
    var getX = get('x');

    it('should retrieve a property from an object', function(){
        a.equal(getX({ x: 2 }), 2);
    });
});
