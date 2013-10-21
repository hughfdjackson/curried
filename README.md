# Curried

**WARNING: experimental**

Standard library, curried, polymorphic, awesome.
[![browser support](https://ci.testling.com/hughfdjackson/curried.png)](https://ci.testling.com/hughfdjackson/curried)

# Why

Curried provides a standard library of utility functions to make writing functional JavaScript **pretty freakin' spesh**.  Choose instead of lodash/underscore if you need:

* The expressivity of currying;
* ALL functions non-mutating*;
* polymorphism; interfaces over implementation.

\* assuming that the types that implement the basic interfaces are ALSO non-mutating.  They should be. Who the heck makes a mutating map, or reduce? mad-men, that's who.

# Requirements

This library assumes an ECMAScript 5 compatible, or the inclusion of es5-shim.

## API

* map
* filter
* reject

* reduce (without seed)
* reduceRight (without seed)

* reduceFrom (with seed)
* reduceRightFrom (with seed)

* invoke
* invokeWith

* compose (uncurried) <3

* get
* combine

### Under consideration

Fantasy land stuff:
* mapply
* mappend
* chain
* of

* fallbacks for arrays and objects where appropriate?
