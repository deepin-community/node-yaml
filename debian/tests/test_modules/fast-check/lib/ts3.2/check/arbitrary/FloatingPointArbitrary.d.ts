import { Arbitrary } from './definition/Arbitrary';
/**
 * For floating point numbers between 0.0 (included) and 1.0 (excluded) - accuracy of `1 / 2**24`
 */
declare function float(): Arbitrary<number>;
/**
 * For floating point numbers between 0.0 (included) and max (excluded) - accuracy of `max / 2**24`
 * @param max Upper bound of the generated floating point
 */
declare function float(max: number): Arbitrary<number>;
/**
 * For floating point numbers between min (included) and max (excluded) - accuracy of `(max - min) / 2**24`
 * @param min Lower bound of the generated floating point
 * @param max Upper bound of the generated floating point
 */
declare function float(min: number, max: number): Arbitrary<number>;
/**
 * For floating point numbers between 0.0 (included) and 1.0 (excluded) - accuracy of `1 / 2**53`
 */
declare function double(): Arbitrary<number>;
/**
 * For floating point numbers between 0.0 (included) and max (excluded) - accuracy of `max / 2**53`
 * @param max Upper bound of the generated floating point
 */
declare function double(max: number): Arbitrary<number>;
/**
 * For floating point numbers between min (included) and max (excluded) - accuracy of `(max - min) / 2**53`
 * @param min Lower bound of the generated floating point
 * @param max Upper bound of the generated floating point
 */
declare function double(min: number, max: number): Arbitrary<number>;
export { float, double };
