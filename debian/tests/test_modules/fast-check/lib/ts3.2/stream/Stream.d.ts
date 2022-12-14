export declare class Stream<T> implements IterableIterator<T> {
    private readonly g;
    /**
     * Create an empty stream of T
     */
    static nil<T>(): Stream<T>;
    /**
     * Create a Stream based on `g`
     * @param g Underlying data of the Stream
     */
    constructor(g: IterableIterator<T>);
    next(): IteratorResult<T>;
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Map all elements of the Stream using `f`
     *
     * WARNING: It closes the current stream
     *
     * @param f Mapper function
     */
    map<U>(f: (v: T) => U): Stream<U>;
    /**
     * Flat map all elements of the Stream using `f`
     *
     * WARNING: It closes the current stream
     *
     * @param f Mapper function
     */
    flatMap<U>(f: (v: T) => IterableIterator<U>): Stream<U>;
    /**
     * Drop elements from the Stream while `f(element) === true`
     *
     * WARNING: It closes the current stream
     *
     * @param f Drop condition
     */
    dropWhile(f: (v: T) => boolean): Stream<T>;
    /**
     * Drop `n` first elements of the Stream
     *
     * WARNING: It closes the current stream
     *
     * @param n Number of elements to drop
     */
    drop(n: number): Stream<T>;
    /**
     * Take elements from the Stream while `f(element) === true`
     *
     * WARNING: It closes the current stream
     *
     * @param f Take condition
     */
    takeWhile(f: (v: T) => boolean): Stream<T>;
    /**
     * Take `n` first elements of the Stream
     *
     * WARNING: It closes the current stream
     *
     * @param n Number of elements to take
     */
    take(n: number): Stream<T>;
    /**
     * Filter elements of the Stream
     *
     * WARNING: It closes the current stream
     *
     * @param f Elements to keep
     */
    filter<U extends T>(f: (v: T) => v is U): Stream<U>;
    /**
     * Filter elements of the Stream
     *
     * WARNING: It closes the current stream
     *
     * @param f Elements to keep
     */
    filter(f: (v: T) => boolean): Stream<T>;
    /**
     * Check whether all elements of the Stream are successful for `f`
     *
     * WARNING: It closes the current stream
     *
     * @param f Condition to check
     */
    every(f: (v: T) => boolean): boolean;
    /**
     * Check whether one of the elements of the Stream is successful for `f`
     *
     * WARNING: It closes the current stream
     *
     * @param f Condition to check
     */
    has(f: (v: T) => boolean): [boolean, T | null];
    /**
     * Join `others` Stream to the current Stream
     *
     * WARNING: It closes the current stream and the other ones (as soon as it iterates over them)
     *
     * @param others Streams to join to the current Stream
     */
    join(...others: IterableIterator<T>[]): Stream<T>;
    /**
     * Take the `nth` element of the Stream of the last (if it does not exist)
     *
     * WARNING: It closes the current stream
     *
     * @param nth Position of the element to extract
     */
    getNthOrLast(nth: number): T | null;
}
/**
 * Create a Stream based on `g`
 * @param g Underlying data of the Stream
 */
export declare function stream<T>(g: IterableIterator<T>): Stream<T>;
