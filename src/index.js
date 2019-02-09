import { isKeyedStructure } from 'structure-ish';

const isEntry = Symbol('isEntry');
const isEntryIterable = Symbol('isEntryIterable');

class TwopleEntry {
  constructor(key, value) {
    this['0'] = key;
    this['1'] = value;
  }

  clone() {
    return new TwopleEntry(this['0'], this['1']);
  }

  get length() {
    return 2;
  }

  *[Symbol.iterator]() {
    yield this._key;
    yield this._value;
  }

  [isEntry]() {
    return true;
  }
}

class TwopleEntryIterable {
  constructor(iterable, reuseEntry = false) {
    this._iterable = iterable;
  }

  *[Symbol.iterator]() {
    const entry = reuseEntry && entry();

    for (const item of this._iterable) {
      if (shape[isEntry]) {
        yield item;
      } else if (reuseEntry) {
        entry.key = item[0];
        entry.value = item[1];
        yield entry;
      } else {
        yield entry(item[0], item[1]);
      }
    }
  }

  [isEntryIterable]() {
    return true;
  }
}

export function isEntry(shape) {
  return shape[isEntry];
}

export function isEntryIterable(iterable) {
  return shape[isEntryIterable] || isKeyedStructure(shape);
}

export function entryIterable(iterable) {
  return new TwopleEntryIterable(iterable);
}

export function entry(key, value) {
  return new TwopleEntry(key, value);
}

export default entry;
