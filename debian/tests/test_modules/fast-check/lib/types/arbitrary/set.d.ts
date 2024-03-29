import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
import { SizeForArbitrary } from './_internals/helpers/MaxLengthFromMinLength';
/**
 * Type used to define a constraints to compare values together based on a selector approach
 * @remarks Since 2.21.0
 * @public
 */
export declare type SetConstraintsSelector<T> = {
    /**
     * The operator to be used to compare the values:
     * - IsStrictlyEqual behaves like `===` — {@link https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstrictlyequal}
     * - SameValue behaves like `Object.is` — {@link https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevalue}
     * - SameValueZero behaves like `Set` or `Map` — {@link https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero}
     * @remarks Since 2.21.0
     */
    type?: 'IsStrictlyEqual' | 'SameValue' | 'SameValueZero';
    /**
     * How we should project the values before comparing them together
     * @remarks Since 2.21.0
     */
    selector?: (v: T) => unknown;
};
/**
 * Constraints to be applied on {@link set}
 * @remarks Since 2.4.0
 * @public
 */
export interface SetConstraints<T> {
    /**
     * Lower bound of the generated array size
     * @remarks Since 2.4.0
     */
    minLength?: number;
    /**
     * Upper bound of the generated array size
     * @remarks Since 2.4.0
     */
    maxLength?: number;
    /**
     * Compare operator - It can either be:
     * - a selector based definition consisting into projecting the value (if needed) onto a relevant
     *   value (see selector) and comparing all those values together based on a selected comparison
     *   operator (see type)
     * - a compare function returning true whenever the two values are equal (not recommended for
     *   large arrays as this approach is more costly in terms of computation and does not scale)
     *
     * It defaults to:
     * - type = "IsStrictlyEqual"
     * - selector = v =&gt; v
     * Which is equivalent (except performances) to: compare = (a, b) =&gt; a === b
     *
     * @remarks Since 2.4.0
     */
    compare?: ((a: T, b: T) => boolean) | SetConstraintsSelector<T>;
    /**
     * Define how large the generated values should be (at max)
     *
     * When used in conjonction with `maxLength`, `size` will be used to define
     * the upper bound of the generated array size while `maxLength` will be used
     * to define and document the general maximal length allowed for this case.
     *
     * @remarks Since 2.22.0
     */
    size?: SizeForArbitrary;
}
/**
 * For arrays of unique values coming from `arb`
 *
 * @param arb - Arbitrary used to generate the values inside the array
 *
 * @deprecated
 * Prefer `fc.uniqueArray(arb, {comparator: 'IsStrictlyEqual'})` instead.
 *
 * @remarks Since 0.0.11
 * @public
 */
declare function set<T>(arb: Arbitrary<T>): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having an upper bound size
 *
 * @param arb - Arbitrary used to generate the values inside the array
 * @param maxLength - Upper bound of the generated array size
 *
 * @deprecated
 * Superceded by `fc.set(arb, {maxLength})` - see {@link https://github.com/dubzzz/fast-check/issues/992 | #992}.
 * Ease the migration with {@link https://github.com/dubzzz/fast-check/tree/main/codemods/unify-signatures | our codemod script}.
 *
 * @remarks Since 0.0.11
 * @public
 */
declare function set<T>(arb: Arbitrary<T>, maxLength: number): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having lower and upper bound size
 *
 * @param arb - Arbitrary used to generate the values inside the array
 * @param minLength - Lower bound of the generated array size
 * @param maxLength - Upper bound of the generated array size
 *
 * @deprecated
 * Superceded by `fc.set(arb, {minLength, maxLength})` - see {@link https://github.com/dubzzz/fast-check/issues/992 | #992}.
 * Ease the migration with {@link https://github.com/dubzzz/fast-check/tree/main/codemods/unify-signatures | our codemod script}.
 *
 * @remarks Since 0.0.11
 * @public
 */
declare function set<T>(arb: Arbitrary<T>, minLength: number, maxLength: number): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` - unicity defined by `compare`
 *
 * @param arb - Arbitrary used to generate the values inside the array
 * @param compare - Return true when the two values are equals
 *
 * @deprecated
 * Superceded by `fc.set(arb, {compare})` - see {@link https://github.com/dubzzz/fast-check/issues/992 | #992}.
 * Ease the migration with {@link https://github.com/dubzzz/fast-check/tree/main/codemods/unify-signatures | our codemod script}.
 *
 * @remarks Since 0.0.11
 * @public
 */
declare function set<T>(arb: Arbitrary<T>, compare: (a: T, b: T) => boolean): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having an upper bound size - unicity defined by `compare`
 *
 * @param arb - Arbitrary used to generate the values inside the array
 * @param maxLength - Upper bound of the generated array size
 * @param compare - Return true when the two values are equals
 *
 * @deprecated
 * Superceded by `fc.array(arb, {maxLength, compare})` - see {@link https://github.com/dubzzz/fast-check/issues/992 | #992}.
 * Ease the migration with {@link https://github.com/dubzzz/fast-check/tree/main/codemods/unify-signatures | our codemod script}.
 *
 * @remarks Since 0.0.11
 * @public
 */
declare function set<T>(arb: Arbitrary<T>, maxLength: number, compare: (a: T, b: T) => boolean): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb` having lower and upper bound size - unicity defined by `compare`
 *
 * @param arb - Arbitrary used to generate the values inside the array
 * @param minLength - Lower bound of the generated array size
 * @param maxLength - Upper bound of the generated array size
 * @param compare - Return true when the two values are equals
 *
 * @deprecated
 * Superceded by `fc.array(arb, {minLength, maxLength, compare})` - see {@link https://github.com/dubzzz/fast-check/issues/992 | #992}.
 * Ease the migration with {@link https://github.com/dubzzz/fast-check/tree/main/codemods/unify-signatures | our codemod script}.
 *
 * @remarks Since 0.0.11
 * @public
 */
declare function set<T>(arb: Arbitrary<T>, minLength: number, maxLength: number, compare: (a: T, b: T) => boolean): Arbitrary<T[]>;
/**
 * For arrays of unique values coming from `arb`
 *
 * @param arb - Arbitrary used to generate the values inside the array
 * @param constraints - Constraints to apply when building instances
 *
 * @deprecated
 * Prefer `fc.uniqueArray(arb, ...)` instead.
 *
 * @remarks Since 2.4.0
 * @public
 */
declare function set<T>(arb: Arbitrary<T>, constraints: SetConstraints<T>): Arbitrary<T[]>;
export { set };
