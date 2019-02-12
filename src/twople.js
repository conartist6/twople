import { EntryIterable, isEntryIterable } from 'structure-ish';

const Entry = Symbol.for('twople.protocol.entry');

class EntryIterator {
  constructor(entry) {
    this._i = 0;
    this._entry = entry;
  }

  next() {
    return {
      value: this._entry[this._i],
      done: this._i++ >= 2,
    };
  }
}

class TwopleEntry {
  constructor(key, value) {
    this[0] = key;
    this[1] = value;
  }

  clone() {
    return new TwopleEntry(this[0], this[1]);
  }

  get length() {
    return 2;
  }

  [Symbol.iterator]() {
    return new EntryIterator(this);
  }

  [Entry]() {
    return true;
  }
}

class TwopleEntryIterator {
  constructor(source, reuseEntry) {
    this._done = false;
    this._entry = reuseEntry ? entry() : null;
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

      let sharedEntry;
      let value;
      if (item[Entry]) {
        value = item.value;
      } else if ((sharedEntry = this._entry)) {
        sharedEntry[0] = item.value[0];
        sharedEntry[1] = item.value[1];
        value = sharedEntry;
      } else {
        value = entry(item.value[0], item.value[1]);
      }

      return {
        value,
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

export function isEntry(shape) {
  return !!(shape && shape[Entry]);
}

export function entryIterable(iterable, reuseEntry = false) {
  return new TwopleEntryIterable(iterable, reuseEntry);
}

export function entry(key, value) {
  return new TwopleEntry(key, value);
}

export { isEntryIterable };

export default entry;
