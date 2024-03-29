import { stream } from '../../../stream/Stream.js';
import { NextValue } from '../../../check/arbitrary/definition/NextValue.js';
function halveBigInt(n) {
    return n / BigInt(2);
}
export function shrinkBigInt(current, target, tryTargetAsap) {
    const realGap = current - target;
    function* shrinkDecr() {
        let previous = tryTargetAsap ? undefined : target;
        const gap = tryTargetAsap ? realGap : halveBigInt(realGap);
        for (let toremove = gap; toremove > 0; toremove = halveBigInt(toremove)) {
            const next = current - toremove;
            yield new NextValue(next, previous);
            previous = next;
        }
    }
    function* shrinkIncr() {
        let previous = tryTargetAsap ? undefined : target;
        const gap = tryTargetAsap ? realGap : halveBigInt(realGap);
        for (let toremove = gap; toremove < 0; toremove = halveBigInt(toremove)) {
            const next = current - toremove;
            yield new NextValue(next, previous);
            previous = next;
        }
    }
    return realGap > 0 ? stream(shrinkDecr()) : stream(shrinkIncr());
}
