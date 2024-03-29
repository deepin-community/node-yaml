import { ArrayArbitrary } from './_internals/ArrayArbitrary.js';
import { convertFromNext, convertToNext } from '../check/arbitrary/definition/Converters.js';
import { MaxLengthUpperBound, maxGeneratedLengthFromSizeForArbitrary, } from './_internals/helpers/MaxLengthFromMinLength.js';
import { CustomEqualSet } from './_internals/helpers/CustomEqualSet.js';
import { StrictlyEqualSet } from './_internals/helpers/StrictlyEqualSet.js';
import { SameValueSet } from './_internals/helpers/SameValueSet.js';
import { SameValueZeroSet } from './_internals/helpers/SameValueZeroSet.js';
function buildSetBuilder(constraints) {
    const compare = constraints.compare || {};
    if (typeof compare === 'function') {
        const isEqualForBuilder = (nextA, nextB) => compare(nextA.value_, nextB.value_);
        return () => new CustomEqualSet(isEqualForBuilder);
    }
    const selector = compare.selector || ((v) => v);
    const refinedSelector = (next) => selector(next.value_);
    switch (compare.type) {
        case 'SameValue':
            return () => new SameValueSet(refinedSelector);
        case 'SameValueZero':
            return () => new SameValueZeroSet(refinedSelector);
        case 'IsStrictlyEqual':
        case undefined:
            return () => new StrictlyEqualSet(refinedSelector);
    }
}
function buildCompleteSetConstraints(constraints) {
    const minLength = constraints.minLength !== undefined ? constraints.minLength : 0;
    const maxLength = constraints.maxLength !== undefined ? constraints.maxLength : MaxLengthUpperBound;
    const maxGeneratedLength = maxGeneratedLengthFromSizeForArbitrary(constraints.size, minLength, maxLength, constraints.maxLength !== undefined);
    const setBuilder = buildSetBuilder(constraints);
    return { minLength, maxGeneratedLength, maxLength, setBuilder };
}
function extractSetConstraints(args) {
    if (args[0] === undefined) {
        return {};
    }
    if (args[1] === undefined) {
        const sargs = args;
        if (typeof sargs[0] === 'number')
            return { maxLength: sargs[0] };
        if (typeof sargs[0] === 'function')
            return { compare: sargs[0] };
        return sargs[0];
    }
    if (args[2] === undefined) {
        const sargs = args;
        if (typeof sargs[1] === 'number')
            return { minLength: sargs[0], maxLength: sargs[1] };
        return { maxLength: sargs[0], compare: sargs[1] };
    }
    const sargs = args;
    return { minLength: sargs[0], maxLength: sargs[1], compare: sargs[2] };
}
function set(arb, ...args) {
    const constraints = buildCompleteSetConstraints(extractSetConstraints(args));
    const minLength = constraints.minLength;
    const maxLength = constraints.maxLength;
    const maxGeneratedLength = constraints.maxGeneratedLength;
    const setBuilder = constraints.setBuilder;
    const nextArb = convertToNext(arb);
    const arrayArb = convertFromNext(new ArrayArbitrary(nextArb, minLength, maxGeneratedLength, maxLength, setBuilder));
    if (minLength === 0)
        return arrayArb;
    return arrayArb.filter((tab) => tab.length >= minLength);
}
export { set };
