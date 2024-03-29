"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const ArrayArbitrary_1 = require("./_internals/ArrayArbitrary");
const Converters_1 = require("../check/arbitrary/definition/Converters");
const MaxLengthFromMinLength_1 = require("./_internals/helpers/MaxLengthFromMinLength");
const CustomEqualSet_1 = require("./_internals/helpers/CustomEqualSet");
const StrictlyEqualSet_1 = require("./_internals/helpers/StrictlyEqualSet");
const SameValueSet_1 = require("./_internals/helpers/SameValueSet");
const SameValueZeroSet_1 = require("./_internals/helpers/SameValueZeroSet");
function buildSetBuilder(constraints) {
    const compare = constraints.compare || {};
    if (typeof compare === 'function') {
        const isEqualForBuilder = (nextA, nextB) => compare(nextA.value_, nextB.value_);
        return () => new CustomEqualSet_1.CustomEqualSet(isEqualForBuilder);
    }
    const selector = compare.selector || ((v) => v);
    const refinedSelector = (next) => selector(next.value_);
    switch (compare.type) {
        case 'SameValue':
            return () => new SameValueSet_1.SameValueSet(refinedSelector);
        case 'SameValueZero':
            return () => new SameValueZeroSet_1.SameValueZeroSet(refinedSelector);
        case 'IsStrictlyEqual':
        case undefined:
            return () => new StrictlyEqualSet_1.StrictlyEqualSet(refinedSelector);
    }
}
function buildCompleteSetConstraints(constraints) {
    const minLength = constraints.minLength !== undefined ? constraints.minLength : 0;
    const maxLength = constraints.maxLength !== undefined ? constraints.maxLength : MaxLengthFromMinLength_1.MaxLengthUpperBound;
    const maxGeneratedLength = (0, MaxLengthFromMinLength_1.maxGeneratedLengthFromSizeForArbitrary)(constraints.size, minLength, maxLength, constraints.maxLength !== undefined);
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
    const nextArb = (0, Converters_1.convertToNext)(arb);
    const arrayArb = (0, Converters_1.convertFromNext)(new ArrayArbitrary_1.ArrayArbitrary(nextArb, minLength, maxGeneratedLength, maxLength, setBuilder));
    if (minLength === 0)
        return arrayArb;
    return arrayArb.filter((tab) => tab.length >= minLength);
}
exports.set = set;
