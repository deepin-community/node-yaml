"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64String = void 0;
const Converters_1 = require("../check/arbitrary/definition/Converters");
const array_1 = require("./array");
const base64_1 = require("./base64");
const MaxLengthFromMinLength_1 = require("./_internals/helpers/MaxLengthFromMinLength");
const StringConstraintsExtractor_1 = require("./_internals/helpers/StringConstraintsExtractor");
const CodePointsToString_1 = require("./_internals/mappers/CodePointsToString");
const StringToBase64_1 = require("./_internals/mappers/StringToBase64");
function base64String(...args) {
    const constraints = (0, StringConstraintsExtractor_1.extractStringConstraints)(args);
    const { minLength: unscaledMinLength = 0, maxLength: unscaledMaxLength = MaxLengthFromMinLength_1.MaxLengthUpperBound, size } = constraints;
    const minLength = unscaledMinLength + 3 - ((unscaledMinLength + 3) % 4);
    const maxLength = unscaledMaxLength - (unscaledMaxLength % 4);
    const requestedSize = constraints.maxLength === undefined && size === undefined ? '=' : size;
    if (minLength > maxLength)
        throw new Error('Minimal length should be inferior or equal to maximal length');
    if (minLength % 4 !== 0)
        throw new Error('Minimal length of base64 strings must be a multiple of 4');
    if (maxLength % 4 !== 0)
        throw new Error('Maximal length of base64 strings must be a multiple of 4');
    return (0, Converters_1.convertFromNext)((0, Converters_1.convertToNext)((0, array_1.array)((0, base64_1.base64)(), { minLength, maxLength, size: requestedSize }))
        .map(CodePointsToString_1.codePointsToStringMapper, CodePointsToString_1.codePointsToStringUnmapper)
        .map(StringToBase64_1.stringToBase64Mapper, StringToBase64_1.stringToBase64Unmapper));
}
exports.base64String = base64String;
