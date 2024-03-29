"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnbiasedProperty = void 0;
class UnbiasedProperty {
    constructor(property) {
        this.property = property;
    }
    isAsync() {
        return this.property.isAsync();
    }
    generate(mrng, _runId) {
        return this.property.generate(mrng, undefined);
    }
    shrink(value) {
        return this.property.shrink(value);
    }
    run(v) {
        return this.property.run(v);
    }
}
exports.UnbiasedProperty = UnbiasedProperty;
