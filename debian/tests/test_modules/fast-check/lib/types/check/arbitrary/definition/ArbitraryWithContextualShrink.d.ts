import { Random } from '../../../random/generator/Random';
import { Stream } from '../../../stream/Stream';
import { Arbitrary } from './Arbitrary';
import { Shrinkable } from './Shrinkable';
/**
 * Abstract class able to generate and shrink values on type `T`
 *
 * It can shrink a value that it has not produced through `generate` (contrary to {@link Arbitrary}).
 * In the case of classical {@link Arbitrary} there is no `contextualShrink`, `contextualShrinkableFor` methods directly on the {@link Arbitrary},
 * the users have to call `shrink` on the instance of {@link Shrinkable} produced by `generate`.
 *
 * @remarks Since 2.12.0
 * @public
 */
declare abstract class ArbitraryWithContextualShrink<T> extends Arbitrary<T> {
    /**
     * Generate a value of type `T` along with its shrink method
     * based on the provided random number generator
     *
     * @param mrng - Random number generator
     * @returns Random value of type `T` and its shrinker
     *
     * @remarks Since 2.12.0
     */
    abstract generate(mrng: Random): Shrinkable<T>;
    /**
     * Produce a stream of shrinks of value
     *
     * @param value - Value to shrink
     * @param context -
     * @returns Stream of shrinks associated to value
     *
     * @remarks Since 2.12.0
     */
    abstract contextualShrink(value: T, context?: unknown): Stream<[T, unknown]>;
    /**
     * Build the Shrinkable associated to value
     *
     * @param value - Value to shrink
     * @param shrunkOnce - Indicate whether its the first shrink
     * @returns Shrinkable associated to value
     *
     * @remarks Since 2.12.0
     */
    contextualShrinkableFor(value: T, context?: unknown): Shrinkable<T>;
    /**
     * Produce a context for shrunkOnce case
     * @remarks Since 2.12.0
     */
    abstract shrunkOnceContext(): unknown;
    /**
     * Produce a stream of shrinks of value
     *
     * @deprecated Prefer contextualShrink and shrunkOnceContext
     *
     * @param value - Value to shrink
     * @param shrunkOnce - Indicate whether its the first shrink (default: false)
     * @returns Stream of shrinks associated to value
     *
     * @remarks Since 2.12.0
     */
    shrink(value: T, shrunkOnce?: boolean): Stream<T>;
    /**
     * Build the Shrinkable associated to value
     *
     * @deprecated Prefer contextualShrinkableFor and shrunkOnceContext
     *
     * @param value - Value to shrink
     * @param shrunkOnce - Indicate whether its the first shrink
     * @returns Shrinkable associated to value
     *
     * @remarks Since 2.12.0
     */
    shrinkableFor(value: T, shrunkOnce?: boolean): Shrinkable<T>;
}
export { ArbitraryWithContextualShrink };
