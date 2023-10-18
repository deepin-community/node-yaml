"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int8Array = void 0;
const integer_1 = require("./integer");
const TypedIntArrayArbitraryBuilder_1 = require("./_internals/builders/TypedIntArrayArbitraryBuilder");
function int8Array(constraints = {}) {
    return (0, TypedIntArrayArbitraryBuilder_1.typedIntArrayArbitraryArbitraryBuilder)(constraints, -128, 127, Int8Array, integer_1.integer);
}
exports.int8Array = int8Array;
