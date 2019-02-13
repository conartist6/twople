# Twople

Twople is a micro-library for declaring key-value pairs, which in javascript are called "entries" and are implemented as tuples (a tuple is an array of some fixed number of items, in this case two, hence the name). An entry, such as is used to constuct an es6 `Map` can be written as `[key, value]`. I will refer to this as an array entry. Twople offers an alternative, the twople entry, which mimics an array entry in every important manner but also can be reflectively differentiated from any other kind of array.

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
const entryList = [entry('key', 'value')];

new Map(entryList);
```

Now it works great!

### Reflective behavior

Some functions work better when they are aware of key-value pairs. For example the `map` function normally is passed a callback of the form `(value, i) => ...`. In this circumstance `i` is fulfilling the role of a `key`, because when the map implementation is `Array.prototype.map`, it is indeed the key of the item in the array. If you are trying to write a more general map function however, or make use of such a general function which has already been written, then twople can allow you to understand (or specify) that your input is a sequence of key-value pairs, after which map can give you the appropriate key, and return a result in which only the values are changed.

## API

`function entry(key, value)`
The result of this function is a twople entry. You can access its members just as you would an array entry, e.g. `entry('zero', 'one')[1]` will return `'one'`. It has length `2`, and it is iterable. This function is the default export of the library, even when used in node.

`function entryIterable(iterable, reuseEntry = true)`
This function should be passed an iterable of entries, which may be either array entries or twople entries. The result of this function is an iterable of twople entries. If reuseEntry is true, entryIterable will wrap every array entry it encounters in the same tuple entry. This is more efficient because internally the `Map` consturctor will make copies of entries anyway, and functions like `map` only need one at a time.

The result of entryIterable is an entry iterable as defined by [structure-ish](https://github.com/conartist6/structure-ish#structure-ish)

`function isEntry(shape)`
This function returns true if shape was generated using `entry()`

`function isEntryIterable(iterable)`
This function returns true if iterable was generated using `entryIterable()`
