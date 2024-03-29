"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = void 0;
const Converters_1 = require("../check/arbitrary/definition/Converters");
const ArrayArbitrary_1 = require("./_internals/ArrayArbitrary");
const MaxLengthFromMinLength_1 = require("./_internals/helpers/MaxLengthFromMinLength");
function createArrayArbitrary(nextArb, size, minLength, maxLengthOrUnset) {
    const maxLength = maxLengthOrUnset !== undefined ? maxLengthOrUnset : MaxLengthFromMinLength_1.MaxLengthUpperBound;
    const specifiedMaxLength = maxLengthOrUnset !== undefined;
    const maxGeneratedLength = (0, MaxLengthFromMinLength_1.maxGeneratedLengthFromSizeForArbitrary)(size, minLength, maxLength, specifiedMaxLength);
    return (0, Converters_1.convertFromNext)(new ArrayArbitrary_1.ArrayArbitrary(nextArb, minLength, maxGeneratedLength, maxLength));
}
function array(arb, ...args) {
    const nextArb = (0, Converters_1.convertToNext)(arb);
    if (args[0] === undefined) {
        return createArrayArbitrary(nextArb, undefined, 0, undefined);
    }
    if (typeof args[0] === 'object') {
        return createArrayArbitrary(nextArb, args[0].size, args[0].minLength || 0, args[0].maxLength);
    }
    if (args[1] !== undefined) {
        return createArrayArbitrary(nextArb, undefined, args[0], args[1]);
    }
    return createArrayArbitrary(nextArb, undefined, 0, args[0]);
}
exports.array = array;
