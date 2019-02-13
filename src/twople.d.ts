declare class Entry<K, V> implements Iterable<K | V> {
  [0]: K;
  [1]: V;
  [Symbol.iterator](): Iterator<K | V>
}

declare function entry<K = undefined, V = undefined>(key?: K, value?: V): Entry<K, V>;
declare function entryIterable<K, V>(
  iterable: Iterable<[K, V] | Entry<K, V>>,
  reuseEntry?: boolean
): Iterable<Entry<K, V>>;
declare function entryIterable<K, V>(
  iterable: ReadonlyArray<[K, V]>,
  reuseEntry?: boolean
): Iterable<Entry<K, V>>;

declare function isEntryIterable(shape: any): boolean;

export { entry, entryIterable, isEntryIterable };
export default entry;
