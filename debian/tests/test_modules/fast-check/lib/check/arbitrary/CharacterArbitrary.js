"use strict";
exports.__esModule = true;
var polyfills_1 = require("../../utils/polyfills");
var IntegerArbitrary_1 = require("./IntegerArbitrary");
function CharacterArbitrary(min, max, mapToCode) {
    return IntegerArbitrary_1.integer(min, max).map(function (n) { return polyfills_1.StringFromCodePointLimited(mapToCode(n)); });
}
var preferPrintableMapper = function (v) {
    if (v < 95)
        return v + 0x20;
    if (v <= 0x7e)
        return v - 95;
    return v;
};
function char() {
    return CharacterArbitrary(0x20, 0x7e, function (v) { return v; });
}
exports.char = char;
function hexa() {
    function mapper(v) {
        return v < 10
            ? v + 48
            : v + 97 - 10;
    }
    return CharacterArbitrary(0, 15, mapper);
}
exports.hexa = hexa;
function base64() {
    function mapper(v) {
        if (v < 26)
            return v + 65;
        if (v < 52)
            return v + 97 - 26;
        if (v < 62)
            return v + 48 - 52;
        return v === 62 ? 43 : 47;
    }
    return CharacterArbitrary(0, 63, mapper);
}
exports.base64 = base64;
function ascii() {
    return CharacterArbitrary(0x00, 0x7f, preferPrintableMapper);
}
exports.ascii = ascii;
function char16bits() {
    return CharacterArbitrary(0x0000, 0xffff, preferPrintableMapper);
}
exports.char16bits = char16bits;
function unicode() {
    var gapSize = 0xdfff + 1 - 0xd800;
    function mapping(v) {
        if (v < 0xd800)
            return preferPrintableMapper(v);
        return v + gapSize;
    }
    return CharacterArbitrary(0x0000, 0xffff - gapSize, mapping);
}
exports.unicode = unicode;
function fullUnicode() {
    var gapSize = 0xdfff + 1 - 0xd800;
    function mapping(v) {
        if (v < 0xd800)
            return preferPrintableMapper(v);
        return v + gapSize;
    }
    return CharacterArbitrary(0x0000, 0x10ffff - gapSize, mapping);
}
exports.fullUnicode = fullUnicode;
