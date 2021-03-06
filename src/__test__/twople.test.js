import entryDefault, { entry, entryIterable, isEntryIterable } from '../twople';

describe('exports', () => {
  it('the default export is the twople function', () => {
    expect(entryDefault).toBe(entry);
  });
});

describe('entry', () => {
  it('constructs an object', () => {
    expect(entry()).toBeInstanceOf(Object);
  });

  it('has 0 and 1 properties', () => {
    expect(entry()).toEqual([undefined, undefined]);
    expect(entry('key', 'value')).toEqual(['key', 'value']);
  });

  it('is iterable', () => {
    expect(Array.from(entry())).toEqual([undefined, undefined]);
    expect(Array.from(entry('key', 'value'))).toEqual(['key', 'value']);
  });

  it('has length 2', () => {
    expect(entry()).toHaveLength(2);
  });
});

describe('entryIterable', () => {
  it('when given tuple entries, returns those entries', () => {
    const aEntry = entry(0, 'a');
    const bEntry = entry(1, 'b');
    expect(Array.from(entryIterable([aEntry, bEntry]))).toEqual([aEntry, bEntry]);
  });

  it('when given array entries, returns tuples', () => {
    expect(Array.from(entryIterable([[0, 'a'], [1, 'b']]))).toEqual([
      entry(0, 'a'),
      entry(1, 'b'),
    ]);
  });

  it('is an entryIterable', () => {
    expect(isEntryIterable(entryIterable([]))).toBe(true);
  });
});
