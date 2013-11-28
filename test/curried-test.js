var _ = require('../');
var a = require('assert');


//---- POLYMORPHIC ----// 

describe('map', function(){
    var mapInc = _.map(function(a){ return a + 1 });

    it('should map over an array', function(){
        a.deepEqual(mapInc([1, 2, 3]), [2, 3, 4]);
    })

    it('should restrict to unary', function(){
        var args;
        _.map(function(){ args = arguments }, [1]);
        a.equal(args.length, 1);
    });
});

describe('reduce', function(){
    var cat = _.reduce(function(a, b){ return a + b });

    it('should not expect a seed', function(){
        a.equal(cat(['a', 'b', 'c']), 'abc');
    });

    it('should restrict to binary', function(){
        var args;
        _.reduce(function(){ args = arguments }, [1, 2]);
        a.equal(args.length, 2);
    });
});

describe('reduceRight', function(){
    var reverseCat = _.reduceRight(function(a, b){ return a + b })

    it('should not expect a seed', function(){
        a.equal(reverseCat(['a', 'b', 'c']), 'cba');
    });

    it('should restrict to binary', function(){
        var args;
        _.reduceRight(function(){ args = arguments }, [1, 2]);
        a.equal(args.length, 2);
    });
});

describe('reduceFrom', function(){
    var cat = _.reduceFrom(function(a, b){ return a + b }, '');

    it('should expect a seed', function(){
        a.equal(cat(['a', 'b', 'c']), 'abc');
    });

    it('should restrict to binary', function(){
        var args;
        _.reduceFrom(function(){ args = arguments }, 1, [1]);
        a.equal(args.length, 2);
    });
});

describe('reduceRightFrom', function(){
    var reverseCat = _.reduceRightFrom(function(a, b){ return a + b }, '')

    it('should expect a seed', function(){
        a.equal(reverseCat(['a', 'b', 'c']), 'cba');
    });

    it('should restrict to binary', function(){
        var args;
        _.reduceRightFrom(function(){ args = arguments }, 1, [1]);
        a.equal(args.length, 2);
    });
});

describe('filter', function(){
    var isString = function(a){ return typeof a === 'string' };
    var filterString = _.filter(isString);

    it('should filter', function(){
        a.deepEqual(filterString([1, 2, 'a', 3, 'b']), ['a', 'b']);
    });

    it('should restrict to unary', function(){
        var args;
        _.filter(function(){ args = arguments }, [1]);
        a.equal(args.length, 1);
    });
});

describe('reject', function(){
    var isString = function(a){ return typeof a === 'string' };
    var filterNotString = _.reject(isString);

    it('should reject', function(){
        a.deepEqual(filterNotString([1, 2, 'a', 3, 'b']), [1, 2, 3]);
    });

    it('should restrict to unary', function(){
        var args;
        _.reject(function(){ args = arguments }, [1]);
        a.equal(args.length, 1);
    });
});

//---- FUNCTION ----// 

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
        var isFalsey = _.negate(_.identity);

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
        var o = {};
        var constantO = _.constant(o);
        a.equal(constantO(), o)
    });
});


//--- OBJECT, or Object-like ---//

describe('invoke', function(){
    var toString = _.invoke('toString');

    it('should invoke the method specified', function(){
        ['abc', 1, true, {}]
            .forEach(function(val){
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

    it('should retrieve an object of properties from an object', function(){
        var coords3D = { x: 1, y: 2, z: 200 };
        var coords2D = pick2DCoords(coords3D);

        a.deepEqual(coords2D, { x: 1, y: 2 });
    });
});

describe('combine', function(){
    var defaults = _.combine({ firstName: 'joe', lastName: 'bloggs' });

    it('should merge the last argument over the first with preference', function(){
        var nameChange = defaults({ lastName: 'shufflebottom'});
        a.deepEqual(nameChange, { firstName: 'joe', lastName: 'shufflebottom' });
    });
});


//--- ARRAY, or Array-like ---//
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
    it('should take the last element of an array', function(){
        a.deepEqual(_.tail([1, 2, 3]), 3)
        a.deepEqual(_.tail([]), undefined);

        var trickArr = [];
        trickArr[-1] = 'fake value';

        a.deepEqual(_.tail(trickArr), undefined);
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
    it('should give an array with all but the first member', function(){
        a.deepEqual(_.last([1, 2, 3]), [2, 3]);
        a.deepEqual(_.last([1]), []);
        a.deepEqual(_.last([]), []);
    });
});