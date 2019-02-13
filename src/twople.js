import { EntryIterable, isEntryIterable } from 'structure-ish';

const Entry = Symbol.for('twople.protocol.entry');

class TwopleEntryIterator {
  constructor(source) {
    this._done = false;
    this._sourceIterator = source[Symbol.iterator]();
  }

  next() {
    if (this._done) {
      return this.return();
    } else {
      const item = this._sourceIterator.next();

      if (item.done) {
        return this.return();
      }

      if (!Array.isArray(item.value) || item.value.length !== 2) {
        throw new Error("EntryIterable must be passed an iterable of entries")
      }

      return {
        value: item.value,
        done: false,
      };
    }
  }

  return() {
    if (!this._done && typeof this._sourceIterator.return === 'function') {
      this._sourceIterator.return();
    }
    this._done = true;
    return { done: true, value: undefined };
  }

  [Symbol.iterator]() {
    return this;
  }
}

class TwopleEntryIterable {
  constructor(iterable, reuseEntry) {
    this._iterable = iterable;
    this._reuseEntry = reuseEntry;
  }

  [Symbol.iterator]() {
    return new TwopleEntryIterator(this._iterable, this._reuseEntry);
  }

  [EntryIterable]() {
    return true;
  }
}

export function entryIterable(iterable, reuseEntry = false) {
  return new TwopleEntryIterable(iterable, reuseEntry);
}

export function entry(key, value) {
  return [key, value];
}

export { isEntryIterable };

export default entry;
