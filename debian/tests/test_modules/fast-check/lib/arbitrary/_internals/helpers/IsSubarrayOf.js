"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubarrayOf = void 0;
function isSubarrayOf(source, small) {
    const countMap = new Map();
    let countMinusZero = 0;
    for (const sourceEntry of source) {
        if (Object.is(sourceEntry, -0)) {
            ++countMinusZero;
        }
        else {
            const oldCount = countMap.get(sourceEntry) || 0;
            countMap.set(sourceEntry, oldCount + 1);
        }
    }
    for (let index = 0; index !== small.length; ++index) {
        if (!(index in small)) {
            return false;
        }
        const smallEntry = small[index];
        if (Object.is(smallEntry, -0)) {
            if (countMinusZero === 0)
                return false;
            --countMinusZero;
        }
        else {
            const oldCount = countMap.get(smallEntry) || 0;
            if (oldCount === 0)
                return false;
            countMap.set(smallEntry, oldCount - 1);
        }
    }
    return true;
}
exports.isSubarrayOf = isSubarrayOf;
