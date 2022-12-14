import { ArbitraryWithShrink } from './definition/ArbitraryWithShrink';
/**
 * For integers between -2147483648 (included) and 2147483647 (included)
 */
declare function integer(): ArbitraryWithShrink<number>;
/**
 * For integers between -2147483648 (included) and max (included)
 * @param max Upper bound for the generated integers (eg.: 2147483647, Number.MAX_SAFE_INTEGER)
 */
declare function integer(max: number): ArbitraryWithShrink<number>;
/**
 * For integers between min (included) and max (included)
 *
 * @param min Lower bound for the generated integers (eg.: 0, Number.MIN_SAFE_INTEGER)
 * @param max Upper bound for the generated integers (eg.: 2147483647, Number.MAX_SAFE_INTEGER)
 */
declare function integer(min: number, max: number): ArbitraryWithShrink<number>;
/**
 * For integers between Number.MIN_SAFE_INTEGER (included) and Number.MAX_SAFE_INTEGER (included)
 */
declare function maxSafeInteger(): ArbitraryWithShrink<number>;
/**
 * For positive integers between 0 (included) and 2147483647 (included)
 */
declare function nat(): ArbitraryWithShrink<number>;
/**
 * For positive integers between 0 (included) and max (included)
 * @param max Upper bound for the generated integers
 */
declare function nat(max: number): ArbitraryWithShrink<number>;
/**
 * For positive integers between 0 (included) and Number.MAX_SAFE_INTEGER (included)
 */
declare function maxSafeNat(): ArbitraryWithShrink<number>;
export { integer, nat, maxSafeInteger, maxSafeNat };
