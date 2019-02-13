declare function entry<K = undefined, V = undefined>(key?: K, value?: V): [K, V];

declare function entryIterable<K, V>(
  iterable: Iterable<[K, V]>
): Iterable<[K, V]>;
declare function entryIterable<K, V>(
  iterable: ReadonlyArray<[K, V]>
): Iterable<[K, V]>;

declare function isEntryIterable(shape: any): boolean;

export { entry, entryIterable, isEntryIterable };
export default entry;
