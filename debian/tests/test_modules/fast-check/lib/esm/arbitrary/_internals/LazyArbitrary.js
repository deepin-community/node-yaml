import { NextArbitrary } from '../../check/arbitrary/definition/NextArbitrary.js';
export class LazyArbitrary extends NextArbitrary {
    constructor(name) {
        super();
        this.name = name;
        this.underlying = null;
    }
    generate(mrng, biasFactor) {
        if (!this.underlying) {
            throw new Error(`Lazy arbitrary ${JSON.stringify(this.name)} not correctly initialized`);
        }
        return this.underlying.generate(mrng, biasFactor);
    }
    canShrinkWithoutContext(value) {
        if (!this.underlying) {
            throw new Error(`Lazy arbitrary ${JSON.stringify(this.name)} not correctly initialized`);
        }
        return this.underlying.canShrinkWithoutContext(value);
    }
    shrink(value, context) {
        if (!this.underlying) {
            throw new Error(`Lazy arbitrary ${JSON.stringify(this.name)} not correctly initialized`);
        }
        return this.underlying.shrink(value, context);
    }
}
