# Curried

Awesome curried standard library.

[![browser support](https://ci.testling.com/hughfdjackson/curried.png)](https://ci.testling.com/hughfdjackson/curried)

## Installation

In your project folder:
```
npm install curried --save
```

In a file:
```
var _ = require('curried');
```

## API

### COLLECTION

Collection functions work on Arrays AND objects.

#### map

```javascript
var mapInc = _.map(function(a){ return a + 1 });

mapInc([1, 2, 3]) //= [2, 3, 4]

mapInc({ x: 1, y: 2, z: 3 }) //= { x: 2, y: 3, z: 4 }
```

#### filter

```javascript
var isString = function(a){ return typeof a === 'string' };
var filterString = _.filter(isString);

filterString([1, 2, 'a', 3, 'b']) //= ['a', 'b']

filterString({ x: 1, y: 2, z: 'a', a: 3, b: 'b' }) //= { z: 'a', b: 'b' }
```

#### reject

```javascript
var isString = function(a){ return typeof a === 'string' };
var filterNotString = _.reject(isString);

filterNotString([1, 2, 'a', 3, 'b']) //= [1, 2, 3]

filterNotString({ x: 1, y: 2, z: 'a', a: 3, b: 'b' }) //= { x: 1, y: 2, a: 3 }
```

#### every

```javascript
var isString = function(a){ return typeof a === 'string' };
var allString = _.every(isString);

allString([1, 2, 'a', 3, 'b']) //= false
allString(['a', '3', 'b']) //= true

allString({ x: 1, y: 2, z: 'a' }) //= false
allString({ x: '1', y: 'b', z: 'a' }) //= true
```

#### some

```javascript
var isString = function(a){ return typeof a === 'string' };
var someString = _.some(isString);

someString([1, 2, 'a', 3, 'b']) //= true
someString([3, 4]) //= false

someString({ x: 1, y: 2, z: 'a' }) //= true
someString({ x: 1, y: 2, z: 3 }) //= false
```

#### reduce

```javascript
var cat = _.reduce(function(a, b){ return a + b });
cat(['a', 'b', 'c']) //= 'abc'
```

Since objects don't have guaranteed order in ECMAScript, it's only safe to reduce over objects with operations
that don't need arguments in any particular order (commutative).

```javascript
var sum = _.reduce(function(a, b){ return a + b });
sum({ x: 1, y: 2, z: 3 }) //= 6
```

#### reduceRight

```javascript
var reverseCat = _.reduceRight(function(a, b){ return a + b });
reverseCat(['a', 'b', 'c']) //= 'cba'

var sum = _.reduceRight(function(a, b){ return a + b });
sum({ x: 1, y: 2, z: 3 }) //= 6
```

#### reduceFrom

```javascript
var catWithPrefix = _.reduceFrom(function(a, b){ return a + b }, 'super awesome ');
catWithPrefix(['a', 'b', 'c']) //= 'super awesome abc'

var sumFrom3 = _.reduceFrom(function(a, b){ return a + b }, 3);
sumFrom3({ x: 1, y: 2, z: 3 }) //= 9
```

#### reduceRightFrom

```javascript
var reverseCatWithPrefix = _.reduceRightFrom(function(a, b){ return a + b }, 'super awesome ');
reverseCatWithPrefix(['a', 'b', 'c']) //= 'super awesome cba'

var sumFrom3 = _.reduceRightFrom(function(a, b){ return a + b }, 3);
sumFrom3({ x: 1, y: 2, z: 3 }) //= 9
```

### OBJECT

Works on objects - or things that act like an object (i.e. have properties).

#### invoke

```javascript
var toString = _.invoke('toString');

['abc', 1, true, {}].map(toString(val)) //= ['abc', '1', 'true', '[object Object]']
```

#### invokeWith

```javascript
var mapInc = _.invokeWith('parse', [function(a){ return a + 1 }]);
mapInc([1, 2, 3]) //= [2, 3, 4]
```

#### get

```javascript
var getX = _.get('x');
getX({ x: 2 }) //= 2
```

#### pick

```javascript
var pick2DCoords = _.pick(['x', 'y']);
var coords3D = { x: 1, y: 2, z: 200 };

pick2DCoords(coords3D) //= { x: 1, y: 2 }
```

#### combine

```javascript
var defaults = _.combine({ firstName: 'joe', lastName: 'bloggs' });

defaults({ lastName: 'shufflebottom'} //= { firstName: 'joe', lastName: 'shufflebottom' }
```

#### keys

```javascript
_.keys({ x: 1, y: 2, z: 3 }) //= ['x', 'y', 'z']
```

#### values

```javascript
_.values({ x: 1, y: 2, z: 3 }) //= [1, 2, 3]
```

### ARRAY

For those functions that only make sense with an ordered list.

#### take


```javascript
var take5 = _.take(5);
take5([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) //= [1, 2, 3, 4, 5]
```

#### head

```javascript
_.head([1, 2, 3]) //= 1
_.head([]) //= undefined
```

#### tail

```javascript
_.tail([1, 2, 3]) //= [2, 3]
_.tail([1]) //= []
_.tail([]) //= []
```

#### initial

```javascript
_.initial([1, 2, 3]) //= [1, 2]
_.initial([1]) //= []
_.initial([]) //= []
```

#### last

```javascript
_.last([1, 2, 3]) //= 3
_.last([]) //= undefined
```

### FUNCTION

Functions that produce functions.

#### compose

```javascript
var trimL = function(a){ return a.replace(/^[ ]+/, '') }
var trimR = function(a){ return a.replace(/[ ]+$/, '') }
var upperCaseTrim = _.compose(trimL, trimR, _.invoke('toUpperCase'));

upperCaseTrim(' abc ') //= 'ABC'
```

#### negate

```javascript
var isTruthy = function(a){ return !!a };
var isFalsey = _.negate(isTruthy);

isFalsey(0) //= true
isFalsey(1) //= false
isFalsey('') //= true
isFalsey('abc') //= false
isFalsey({}) //= false
```

#### flip

```javascript
var cat = function(a, b){ return a + b };
var flipCat = _.flip(cat);
var suffixIsm = flipCat('ism');

suffixIsm('loyal') //= 'loyalism'
```

#### identity

```javascript
var o = {}
_.identity(o) === o //= true
```

#### tap

```javascript
var logs = [];
var log = function(a){ logs.push(a) };

var identityLog = _.tap(log);

identityLog('a') //= 'a'
logs[0] //= 'a'
```

#### constant

```javascript
constant('a')() //= 'a'
```

#### curry

Same as [curry](http://npmjs.org/package/curry)
