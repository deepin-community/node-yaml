"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyArbitraryBuilder = void 0;
const stringify_1 = require("../../../utils/stringify");
const array_1 = require("../../array");
const frequency_1 = require("../../frequency");
const oneof_1 = require("../../oneof");
const tuple_1 = require("../../tuple");
const bigInt_1 = require("../../bigInt");
const date_1 = require("../../date");
const float32Array_1 = require("../../float32Array");
const float64Array_1 = require("../../float64Array");
const int16Array_1 = require("../../int16Array");
const int32Array_1 = require("../../int32Array");
const int8Array_1 = require("../../int8Array");
const uint16Array_1 = require("../../uint16Array");
const uint32Array_1 = require("../../uint32Array");
const uint8Array_1 = require("../../uint8Array");
const uint8ClampedArray_1 = require("../../uint8ClampedArray");
const sparseArray_1 = require("../../sparseArray");
const KeyValuePairsToObject_1 = require("../mappers/KeyValuePairsToObject");
const Converters_1 = require("../../../check/arbitrary/definition/Converters");
const ArrayToMap_1 = require("../mappers/ArrayToMap");
const ArrayToSet_1 = require("../mappers/ArrayToSet");
const ObjectToPrototypeLess_1 = require("../mappers/ObjectToPrototypeLess");
const letrec_1 = require("../../letrec");
const uniqueArray_1 = require("../../uniqueArray");
function entriesOf(keyArb, valueArb, maxKeys, size) {
    return (0, Converters_1.convertToNext)((0, uniqueArray_1.uniqueArray)((0, tuple_1.tuple)(keyArb, valueArb), {
        maxLength: maxKeys,
        size,
        comparator: 'SameValueZero',
        selector: (t) => t[0],
    }));
}
function mapOf(ka, va, maxKeys, size) {
    return (0, Converters_1.convertFromNext)(entriesOf(ka, va, maxKeys, size).map(ArrayToMap_1.arrayToMapMapper, ArrayToMap_1.arrayToMapUnmapper));
}
function dictOf(ka, va, maxKeys, size) {
    return (0, Converters_1.convertFromNext)(entriesOf(ka, va, maxKeys, size).map(KeyValuePairsToObject_1.keyValuePairsToObjectMapper, KeyValuePairsToObject_1.keyValuePairsToObjectUnmapper));
}
function setOf(va, maxKeys, size) {
    return (0, Converters_1.convertFromNext)((0, Converters_1.convertToNext)((0, uniqueArray_1.uniqueArray)(va, { maxLength: maxKeys, size, comparator: 'SameValueZero' })).map(ArrayToSet_1.arrayToSetMapper, ArrayToSet_1.arrayToSetUnmapper));
}
function prototypeLessOf(objectArb) {
    return (0, Converters_1.convertFromNext)((0, Converters_1.convertToNext)(objectArb).map(ObjectToPrototypeLess_1.objectToPrototypeLessMapper, ObjectToPrototypeLess_1.objectToPrototypeLessUnmapper));
}
function typedArray(constraints) {
    return (0, oneof_1.oneof)((0, int8Array_1.int8Array)(constraints), (0, uint8Array_1.uint8Array)(constraints), (0, uint8ClampedArray_1.uint8ClampedArray)(constraints), (0, int16Array_1.int16Array)(constraints), (0, uint16Array_1.uint16Array)(constraints), (0, int32Array_1.int32Array)(constraints), (0, uint32Array_1.uint32Array)(constraints), (0, float32Array_1.float32Array)(constraints), (0, float64Array_1.float64Array)(constraints));
}
function anyArbitraryBuilder(constraints) {
    const arbitrariesForBase = constraints.values;
    const depthFactor = constraints.depthFactor;
    const maxDepth = constraints.maxDepth;
    const maxKeys = constraints.maxKeys;
    const size = constraints.size;
    const baseArb = (0, oneof_1.oneof)(...arbitrariesForBase);
    return (0, letrec_1.letrec)((tie) => ({
        anything: (0, oneof_1.oneof)({ maxDepth, depthFactor }, baseArb, tie('array'), tie('object'), ...(constraints.withMap ? [tie('map')] : []), ...(constraints.withSet ? [tie('set')] : []), ...(constraints.withObjectString ? [tie('anything').map((o) => (0, stringify_1.stringify)(o))] : []), ...(constraints.withNullPrototype ? [prototypeLessOf(tie('object'))] : []), ...(constraints.withBigInt ? [(0, bigInt_1.bigInt)()] : []), ...(constraints.withDate ? [(0, date_1.date)()] : []), ...(constraints.withTypedArray ? [typedArray({ maxLength: maxKeys, size })] : []), ...(constraints.withSparseArray ? [(0, sparseArray_1.sparseArray)(tie('anything'), { maxNumElements: maxKeys, size })] : [])),
        keys: constraints.withObjectString
            ? (0, frequency_1.frequency)({ arbitrary: constraints.key, weight: 10 }, { arbitrary: tie('anything').map((o) => (0, stringify_1.stringify)(o)), weight: 1 })
            : constraints.key,
        arrayBase: (0, oneof_1.oneof)(...arbitrariesForBase.map((arb) => (0, array_1.array)(arb, { maxLength: maxKeys, size }))),
        array: (0, oneof_1.oneof)(tie('arrayBase'), (0, array_1.array)(tie('anything'), { maxLength: maxKeys, size })),
        setBase: (0, oneof_1.oneof)(...arbitrariesForBase.map((arb) => setOf(arb, maxKeys, size))),
        set: (0, oneof_1.oneof)(tie('setBase'), setOf(tie('anything'), maxKeys, size)),
        mapBase: (0, oneof_1.oneof)(...arbitrariesForBase.map((arb) => mapOf(tie('keys'), arb, maxKeys, size))),
        map: (0, oneof_1.oneof)(tie('mapBase'), (0, oneof_1.oneof)(mapOf(tie('keys'), tie('anything'), maxKeys, size), mapOf(tie('anything'), tie('anything'), maxKeys, size))),
        objectBase: (0, oneof_1.oneof)(...arbitrariesForBase.map((arb) => dictOf(tie('keys'), arb, maxKeys, size))),
        object: (0, oneof_1.oneof)(tie('objectBase'), dictOf(tie('keys'), tie('anything'), maxKeys, size)),
    })).anything;
}
exports.anyArbitraryBuilder = anyArbitraryBuilder;
