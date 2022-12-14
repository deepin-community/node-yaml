import { Stream } from '../../stream/Stream';
import { Arbitrary } from './definition/Arbitrary';
/**
 * Produce an infinite stream of values
 *
 * WARNING: Requires Object.assign
 *
 * @param arb Arbitrary used to generate the values
 */
declare function infiniteStream<T>(arb: Arbitrary<T>): Arbitrary<Stream<T>>;
export { infiniteStream };
