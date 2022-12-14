"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var Stream_1 = require("../../stream/Stream");
var symbols_1 = require("../symbols");
var Arbitrary_1 = require("./definition/Arbitrary");
var Shrinkable_1 = require("./definition/Shrinkable");
var ArrayHelper_1 = require("./helpers/ArrayHelper");
var ConstantArbitrary = (function (_super) {
    tslib_1.__extends(ConstantArbitrary, _super);
    function ConstantArbitrary(values) {
        var _this = _super.call(this) || this;
        _this.values = values;
        return _this;
    }
    ConstantArbitrary.prototype.generate = function (mrng) {
        var _this = this;
        if (this.values.length === 1)
            return new Shrinkable_1.Shrinkable(this.values[0]);
        var id = mrng.nextInt(0, this.values.length - 1);
        if (id === 0)
            return new Shrinkable_1.Shrinkable(this.values[0]);
        function g(v) {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Shrinkable_1.Shrinkable(v)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }
        return new Shrinkable_1.Shrinkable(this.values[id], function () { return Stream_1.stream(g(_this.values[0])); });
    };
    return ConstantArbitrary;
}(Arbitrary_1.Arbitrary));
function constant(value) {
    if (symbols_1.hasCloneMethod(value)) {
        throw new Error('fc.constant does not accept cloneable values, use fc.clonedConstant instead');
    }
    return new ConstantArbitrary([value]);
}
exports.constant = constant;
function clonedConstant(value) {
    if (symbols_1.hasCloneMethod(value)) {
        var producer = function () { return value[symbols_1.cloneMethod](); };
        return new ConstantArbitrary([producer]).map(function (c) { return c(); });
    }
    return new ConstantArbitrary([value]);
}
exports.clonedConstant = clonedConstant;
function constantFrom() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    if (values.length === 0) {
        throw new Error('fc.constantFrom expects at least one parameter');
    }
    if (ArrayHelper_1.findOrUndefined(values, function (v) { return symbols_1.hasCloneMethod(v); }) != undefined) {
        throw new Error('fc.constantFrom does not accept cloneable values, not supported for the moment');
    }
    return new ConstantArbitrary(tslib_1.__spread(values));
}
exports.constantFrom = constantFrom;
