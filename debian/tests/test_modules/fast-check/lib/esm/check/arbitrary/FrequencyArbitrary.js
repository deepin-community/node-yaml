import { __extends, __read, __spread } from "tslib";
import { Arbitrary } from './definition/Arbitrary.js';
var FrequencyArbitrary = (function (_super) {
    __extends(FrequencyArbitrary, _super);
    function FrequencyArbitrary(warbs) {
        var _this = _super.call(this) || this;
        _this.warbs = warbs;
        var currentWeight = 0;
        _this.summedWarbs = [];
        for (var idx = 0; idx !== warbs.length; ++idx) {
            currentWeight += warbs[idx].weight;
            _this.summedWarbs.push({ weight: currentWeight, arbitrary: warbs[idx].arbitrary });
        }
        _this.totalWeight = currentWeight;
        return _this;
    }
    FrequencyArbitrary.prototype.generate = function (mrng) {
        var selected = mrng.nextInt(0, this.totalWeight - 1);
        for (var idx = 0; idx !== this.summedWarbs.length; ++idx) {
            if (selected < this.summedWarbs[idx].weight)
                return this.summedWarbs[idx].arbitrary.generate(mrng);
        }
        throw new Error("Unable to generate from fc.frequency");
    };
    FrequencyArbitrary.prototype.withBias = function (freq) {
        return new FrequencyArbitrary(this.warbs.map(function (v) { return ({ weight: v.weight, arbitrary: v.arbitrary.withBias(freq) }); }));
    };
    return FrequencyArbitrary;
}(Arbitrary));
function frequency() {
    var warbs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        warbs[_i] = arguments[_i];
    }
    if (warbs.length === 0) {
        throw new Error('fc.frequency expects at least one parameter');
    }
    return new FrequencyArbitrary(__spread(warbs));
}
export { frequency };
