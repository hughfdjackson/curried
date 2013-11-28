# Curried

**WARNING: experimental - feedback welcome**

Functional utility library. curried, polymorphic, awesome.

[![browser support](https://ci.testling.com/hughfdjackson/curried.png)](https://ci.testling.com/hughfdjackson/curried)

# Why

Because these are the tools that I find myself writing over and over, day in, day out. Functional javascript is awesome, when you curry it.

# Requirements

This library assumes an ECMAScript 5 compatible, or the inclusion of es5-shim.

## API

### Polymorphic 

* map
* filter
* reject

* reduce (without seed)
* reduceRight (without seed)

* reduceFrom (with seed)
* reduceRightFrom (with seed)

### Function

* flip
* negate 
* compose (uncurried) <3

### Object (or Object-like)

* invoke
* invokeWith
* get
* pick
* combine

