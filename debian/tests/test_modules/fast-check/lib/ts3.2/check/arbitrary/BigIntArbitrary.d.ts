import { ArbitraryWithShrink } from './definition/ArbitraryWithShrink';
/**
 * For signed bigint of n bits
 *
 * Generated values will be between -2^(n-1) (included) and 2^(n-1) (excluded)
 *
 * @param n Maximal number of bits of the generated bigint
 */
declare function bigIntN(n: number): ArbitraryWithShrink<bigint>;
/**
 * For unsigned bigint of n bits
 *
 * Generated values will be between 0 (included) and 2^n (excluded)
 *
 * @param n Maximal number of bits of the generated bigint
 */
declare function bigUintN(n: number): ArbitraryWithShrink<bigint>;
/**
 * For bigint
 */
declare function bigInt(): ArbitraryWithShrink<bigint>;
/**
 * For bigint between min (included) and max (included)
 *
 * @param min Lower bound for the generated integers (eg.: 0n, BigInt(Number.MIN_SAFE_INTEGER))
 * @param max Upper bound for the generated integers (eg.: 2147483647n, BigInt(Number.MAX_SAFE_INTEGER))
 */
declare function bigInt(min: bigint, max: bigint): ArbitraryWithShrink<bigint>;
/**
 * For positive bigint
 */
declare function bigUint(): ArbitraryWithShrink<bigint>;
/**
 * For positive bigint between 0 (included) and max (included)
 * @param max Upper bound for the generated bigint
 */
declare function bigUint(max: bigint): ArbitraryWithShrink<bigint>;
export { bigIntN, bigUintN, bigInt, bigUint };
