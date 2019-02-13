# Twople

Twople is a micro-library for declaring key-value pairs, which in javascript are called "entries" and are implemented as tuples (a tuple is an array of some fixed number of items, in this case two, hence the name). An entry, such as is used to constuct an es6 `Map` can be written as `[key, value]`.

[![Build Status](https://travis-ci.org/conartist6/twople.svg?branch=master)](https://travis-ci.org/conartist6/twople)
[![npm version](https://img.shields.io/npm/v/twople.svg)](https://www.npmjs.com/package/twople)

## Why

Generally there are two specific reasons why you would want to use twoples:

### Initializing maps in Typescript

If you use typescript and tried to write the following, you may have been surprised when it was an error:

```js
const entryList = [['key', 'value']];

new Map(entryList);
```

This fails because typescript only infers forwards in code. It thinks that entry list is of type `Array<Array<"key" | "value">>`, instead of correctly understanding that it should use `Array<["key", "value"]>`.

You can fix this code using twople!

```js
import entry from 'twople';
const entryList = [entry('key1', 'value1'), entry('key2', 'value2')];

new Map(entryList);
```

Now it works great!

### Reflective behavior

Some functions work better when they are aware of key-value pairs. For example the `map` function normally is passed a callback of the form `(value, i) => ...`. In this circumstance `i` is fulfilling the role of a `key`, because when the map implementation is `Array.prototype.map`, it is indeed the key of the item in the array. If you are trying to write a more general map function however, or make use of such a general function which has already been written, then twople can allow you to understand (or specify) that your input is a sequence of key-value pairs, after which map can give you the appropriate key, and return a result in which only the values are changed.

## API

`function entry(key, value)`
The result of this function is an entry: `[key, value]`. This function is the default export of the library, even when used in node.

`function entryIterable(iterable)`
This function is a passthrough. It should be passed an iterable of entries and it will emit those same entries. It will throw an error if any or the items in the iterable is not an Array of size two. `isEntryIterable(entryIterable(iterable))` returns true.

`function isEntryIterable(iterable)`
Returns true if every item in the iterable can safely be expected to be an entry. This function is actually a re-export from [structure-ish](https://github.com/conartist6/structure-ish#structure-ish), and is capable of detecting more types of entry iterables (Maps, for example) than just those created by the `entryIterable` function.
