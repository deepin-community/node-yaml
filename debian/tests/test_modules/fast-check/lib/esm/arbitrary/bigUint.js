import { convertFromNextWithShrunkOnce } from '../check/arbitrary/definition/Converters.js';
import { BigIntArbitrary } from './_internals/BigIntArbitrary.js';
function computeDefaultMax() {
    return (BigInt(1) << BigInt(256)) - BigInt(1);
}
function bigUint(constraints) {
    const requestedMax = typeof constraints === 'object' ? constraints.max : constraints;
    const max = requestedMax !== undefined ? requestedMax : computeDefaultMax();
    if (max < 0) {
        throw new Error('fc.bigUint expects max to be greater than or equal to zero');
    }
    const arb = new BigIntArbitrary(BigInt(0), max);
    return convertFromNextWithShrunkOnce(arb, arb.defaultTarget());
}
export { bigUint };
