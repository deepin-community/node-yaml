import { Arbitrary } from './definition/Arbitrary';
/**
 * For subarrays of `originalArray` (keeps ordering)
 * @param originalArray Original array
 */
declare function subarray<T>(originalArray: T[]): Arbitrary<T[]>;
/**
 * For subarrays of `originalArray` (keeps ordering)
 * @param originalArray Original array
 * @param minLength Lower bound of the generated array size
 * @param maxLength Upper bound of the generated array size
 */
declare function subarray<T>(originalArray: T[], minLength: number, maxLength: number): Arbitrary<T[]>;
/**
 * For subarrays of `originalArray`
 * @param originalArray Original array
 */
declare function shuffledSubarray<T>(originalArray: T[]): Arbitrary<T[]>;
/**
 * For subarrays of `originalArray`
 * @param originalArray Original array
 * @param minLength Lower bound of the generated array size
 * @param maxLength Upper bound of the generated array size
 */
declare function shuffledSubarray<T>(originalArray: T[], minLength: number, maxLength: number): Arbitrary<T[]>;
export { subarray, shuffledSubarray };
