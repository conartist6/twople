declare class Entry<K, V> {
  [0]: K;
  [1]: V;
  constructor(key: K, value: V);
}

declare function entry<K, V>(key: K, value: V): Entry<K, V>;
declare function entryIterable<K, V>(
  iterable: Iterable<[K, V] | Entry<K, V>>,
): Iterable<Entry<K, V>>;

declare function isEntry(shape: any): boolean;
declare function isEntryIterable(shape: any): boolean;

export { entry, entryIterable, isEntry, isEntryIterable };
export default entry;
