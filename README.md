# Curried

**WARNING: experimental - feedback welcome**

Functional utility library. curried, polymorphic, awesome.

[![browser support](https://ci.testling.com/hughfdjackson/curried.png)](https://ci.testling.com/hughfdjackson/curried)

# Why

These are the tools that I find myself writing over and over, day in, day out.  A curried toolkit really is invaluable.

# Requirements

This library assumes an ECMAScript 5 compatible, or the inclusion of es5-shim.

## API

### Polymorphic

Polymorphic functions delegate to methods on one of the arguments passed in.  For instance,

* map - delegates to .map


```javascript
var mapInc = curried.map(function(a){ return a + 1 });

mapInc([1, 2, 3]) //= [2, 3, 4];
```

* reduce - delegates to .reduce

Reduces a collection without an initial seed.

```javascript
var cat = curried.reduce(function(a, b){ return a + b });

cat(['a', 'b', 'c']) //= 'abc'
```

* reduceRight - delegates to .reduceRight

Reduces a collection without an initial seed, but from the right.

```javascript
var reverseCat = _.reduceRight(function(a, b){ return a + b })

reverseCat(['a, 'b', 'c']) //= 'cba'
```

* reduceFrom - delegates to .reduce

Reduces a collection with a seed.

```javascript
var catWithPrefix = _.reduceFrom(function(a, b){ return a + b }, 'super awesome ');

catWithPrefix(['a', 'b', 'c']) //= 'super awesome abc'
```

* reduceRightFrom - delegates to .reduceRight

Reduces a collection with a seed, but from the right.

```javascript
var reverseCatWithPrefix = _.reduceFrom(function(a, b){ return a + b }, 'super awesome ');

reverseCatWithPrefix(['a', 'b', 'c']) //= 'super awesome cba'
```

* filter - delegates to .filter

Filters out collection members for which a predicate function returns *false*.

```javascript
var isString = function(a){ return typeof a === 'string' };
var filterString = _.filter(isString);

filterString([1, 2, 'a', 3, 'b']) //= ['a', 'b']
```

* reject - delegates to .filter

Inverse of filter - filters out collection members for which a predicate function returns *true*.

```javascript
var isString = function(a){ return typeof a === 'string' };
var filterNotString = _.reject(isString);

filterNotString([1, 2, 'a', 3, 'b']) //= [1, 2, 3]
```

### Functions

* compose 

Standard compose - chains together functions so that a values are piped from the rightmost through to the leftmost.  Returns a curried function as a result.

```javascript
var add = function(a, b){ return a + b };
var halve = function(a){ return a / 2 };

var addAndHalve = _.compose(halve, add);
var add1AndHalve = addAndHalve(1);

add1AndHalf(3) //= 2
```

* negate

'Flips' the boolean return from a predicate.  Will return false instead of truthy, and true instead of falsey.

```javascript
var notString = _.negate(isString);

notString(1) //= true
notString('2') //= false
```
* flip

Flips a binary function's argument order.  

```javascript

```

* identity

Return the value passed in.

```javascript
_.identity(1) //= 1 
```
* constant

Creates a function that always returns the same value

```javascript
var always1 = _.constant(1);

always1() //= 1 
```

* tap

Takes a function to execute for its side-effect only, and otherwise creates a function that acts like the identity function.

Useful for adding loggers to promise chains, for example:

```javascript
var log = _.tap(console.log);

fetchUserData()
	.then(log)
	.then(myNextStep);
```

### Objects 

* invoke

Invoke a method on a value:

```javascript
var toString = _.invoke('toString');

toString([1, 2, 3]) //= '[1, 2, 3]''
```

* invokeWith

Invoke a method with arguments on a value:


* get

Get a propert from an object 
* pick
* combine

### Arrays 

* take
* head
* tail
* initial
* last