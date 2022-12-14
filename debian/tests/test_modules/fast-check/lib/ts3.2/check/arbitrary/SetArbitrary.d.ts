import { Arbitrary } from './definition/Arbitrary';
import { Shrinkable } from './definition/Shrinkable';
/** @hidden */
declare function buildCompareFilter<T>(compare: (a: T, b: T) => boolean): (tab: Shrinkable<T>[]) => Shrinkable<T>[];
/**
 * For arrays of unique values coming from `arb`
 * @param arb Arbitrary used to generate the values inside the array
 */
declare function set<T>(arb: Arbitrary<T>): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having an upper bound size
 * @param arb Arbitrary used to generate the values inside the array
 * @param maxLength Upper bound of the generated array size
 */
declare function set<T>(arb: Arbitrary<T>, maxLength: number): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having lower and upper bound size
 * @param arb Arbitrary used to generate the values inside the array
 * @param minLength Lower bound of the generated array size
 * @param maxLength Upper bound of the generated array size
 */
declare function set<T>(arb: Arbitrary<T>, minLength: number, maxLength: number): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` - unicity defined by `compare`
 * @param arb Arbitrary used to generate the values inside the array
 * @param compare Return true when the two values are equals
 */
declare function set<T>(arb: Arbitrary<T>, compare: (a: T, b: T) => boolean): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having an upper bound size - unicity defined by `compare`
 * @param arb Arbitrary used to generate the values inside the array
 * @param maxLength Upper bound of the generated array size
 * @param compare Return true when the two values are equals
 */
declare function set<T>(arb: Arbitrary<T>, maxLength: number, compare: (a: T, b: T) => boolean): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having lower and upper bound size - unicity defined by `compare`
 * @param arb Arbitrary used to generate the values inside the array
 * @param minLength Lower bound of the generated array size
 * @param maxLength Upper bound of the generated array size
 * @param compare Return true when the two values are equals
 */
declare function set<T>(arb: Arbitrary<T>, minLength: number, maxLength: number, compare: (a: T, b: T) => boolean): Arbitrary<T[]>;
export { set, buildCompareFilter };
