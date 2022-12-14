import { Stream } from '../../../stream/Stream';
/**
 * A Shrinkable<T, TShrink = T> holds an internal value of type `T`
 * and can shrink it to smaller `TShrink` values
 */
export declare class Shrinkable<T, TShrink extends T = T> {
    readonly value_: T;
    readonly shrink: () => Stream<Shrinkable<TShrink>>;
    /**
     * State storing the result of hasCloneMethod
     * If <true> the value will be cloned each time it gets accessed
     */
    readonly hasToBeCloned: boolean;
    /**
     * Flag indicating whether or not the this.value has already been called once
     * If so, the underlying will be cloned
     * Only set when hasToBeCloned = true
     */
    private readOnce;
    /**
     * Safe value of the shrinkable
     * Depending on {@link hasToBeCloned} it will either be {@link value_} or a clone of it
     */
    readonly value: T;
    /**
     * @param value Internal value of the shrinkable
     * @param shrink Function producing Stream of shrinks associated to value
     */
    constructor(value_: T, shrink?: () => Stream<Shrinkable<TShrink>>);
    /** @hidden */
    private getValue;
    /** @hidden */
    private applyMapper;
    /**
     * Create another shrinkable by mapping all values using the provided `mapper`
     * Both the original value and the shrunk ones are impacted
     *
     * @param mapper Map function, to produce a new element based on an old one
     * @returns New shrinkable with mapped elements
     */
    map<U>(mapper: (t: T) => U): Shrinkable<U>;
    /**
     * Create another shrinkable
     * by filtering its shrunk values against `predicate`
     *
     * All the shrunk values produced by the resulting `Shrinkable<T>`
     * satisfy `predicate(value) == true`
     *
     * WARNING:
     * When using refinement - `(t: T) => t is U` - only the shrunk values are ensured to be of type U.
     * The type of the current value of the Shrinkable is your responsability.
     *
     * @param refinement Predicate, to test each produced element. Return true to keep the element, false otherwise
     * @returns New shrinkable filtered using predicate
     */
    filter<U extends TShrink>(refinement: (t: TShrink) => t is U): Shrinkable<T, U>;
    /**
     * Create another shrinkable
     * by filtering its shrunk values against `predicate`
     *
     * All the shrunk values produced by the resulting `Shrinkable<T>`
     * satisfy `predicate(value) == true`
     *
     * @param predicate Predicate, to test each produced element. Return true to keep the element, false otherwise
     * @returns New shrinkable filtered using predicate
     */
    filter(predicate: (t: TShrink) => boolean): Shrinkable<T, TShrink>;
}
