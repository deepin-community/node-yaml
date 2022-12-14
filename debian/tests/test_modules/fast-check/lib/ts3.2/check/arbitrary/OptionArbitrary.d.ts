import { Arbitrary } from './definition/Arbitrary';
export interface OptionConstraints<TNil = null> {
    /** The probability to build a nil value is of `1 / freq` */
    freq?: number;
    /** The nil value (default would be null) */
    nil?: TNil;
}
/**
 * For either null or a value coming from `arb`
 * @param arb Arbitrary that will be called to generate a non null value
 */
declare function option<T>(arb: Arbitrary<T>): Arbitrary<T | null>;
/**
 * For either null or a value coming from `arb` with custom frequency
 * @param arb Arbitrary that will be called to generate a non null value
 * @param freq The probability to build a null value is of `1 / freq`
 */
declare function option<T>(arb: Arbitrary<T>, freq: number): Arbitrary<T | null>;
/**
 * For either nil or a value coming from `arb` with custom frequency
 * @param arb Arbitrary that will be called to generate a non nil value
 * @param constraints Constraints on the option
 */
declare function option<T, TNil = null>(arb: Arbitrary<T>, constraints: OptionConstraints<TNil>): Arbitrary<T | TNil>;
export { option };
