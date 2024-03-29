"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayArbitrary = void 0;
const Stream_1 = require("../../stream/Stream");
const symbols_1 = require("../../check/symbols");
const integer_1 = require("../integer");
const LazyIterableIterator_1 = require("../../stream/LazyIterableIterator");
const NextArbitrary_1 = require("../../check/arbitrary/definition/NextArbitrary");
const Converters_1 = require("../../check/arbitrary/definition/Converters");
const NextValue_1 = require("../../check/arbitrary/definition/NextValue");
class ArrayArbitrary extends NextArbitrary_1.NextArbitrary {
    constructor(arb, minLength, maxGeneratedLength, maxLength, setBuilder) {
        super();
        this.arb = arb;
        this.minLength = minLength;
        this.maxGeneratedLength = maxGeneratedLength;
        this.maxLength = maxLength;
        this.setBuilder = setBuilder;
        this.lengthArb = (0, Converters_1.convertToNext)((0, integer_1.integer)(minLength, maxGeneratedLength));
    }
    preFilter(tab) {
        if (this.setBuilder === undefined) {
            return tab;
        }
        const s = this.setBuilder();
        for (let index = 0; index !== tab.length; ++index) {
            s.tryAdd(tab[index]);
        }
        return s.getData();
    }
    static makeItCloneable(vs, shrinkables) {
        vs[symbols_1.cloneMethod] = () => {
            const cloned = [];
            for (let idx = 0; idx !== shrinkables.length; ++idx) {
                cloned.push(shrinkables[idx].value);
            }
            this.makeItCloneable(cloned, shrinkables);
            return cloned;
        };
        return vs;
    }
    generateNItemsNoDuplicates(setBuilder, N, mrng, biasFactorItems) {
        let numSkippedInRow = 0;
        const s = setBuilder();
        while (s.size() < N && numSkippedInRow < this.maxGeneratedLength) {
            const current = this.arb.generate(mrng, biasFactorItems);
            if (s.tryAdd(current)) {
                numSkippedInRow = 0;
            }
            else {
                numSkippedInRow += 1;
            }
        }
        return s.getData();
    }
    generateNItems(N, mrng, biasFactorItems) {
        const items = [];
        for (let index = 0; index !== N; ++index) {
            const current = this.arb.generate(mrng, biasFactorItems);
            items.push(current);
        }
        return items;
    }
    wrapper(itemsRaw, shrunkOnce, itemsRawLengthContext, startIndex) {
        const items = shrunkOnce ? this.preFilter(itemsRaw) : itemsRaw;
        let cloneable = false;
        const vs = [];
        const itemsContexts = [];
        for (let idx = 0; idx !== items.length; ++idx) {
            const s = items[idx];
            cloneable = cloneable || s.hasToBeCloned;
            vs.push(s.value);
            itemsContexts.push(s.context);
        }
        if (cloneable) {
            ArrayArbitrary.makeItCloneable(vs, items);
        }
        const context = {
            shrunkOnce,
            lengthContext: itemsRaw.length === items.length && itemsRawLengthContext !== undefined
                ? itemsRawLengthContext
                : undefined,
            itemsContexts,
            startIndex,
        };
        return new NextValue_1.NextValue(vs, context);
    }
    generate(mrng, biasFactor) {
        const biasMeta = this.applyBias(mrng, biasFactor);
        const targetSize = biasMeta.size;
        const items = this.setBuilder !== undefined
            ? this.generateNItemsNoDuplicates(this.setBuilder, targetSize, mrng, biasMeta.biasFactorItems)
            : this.generateNItems(targetSize, mrng, biasMeta.biasFactorItems);
        return this.wrapper(items, false, undefined, 0);
    }
    applyBias(mrng, biasFactor) {
        if (biasFactor === undefined) {
            return { size: this.lengthArb.generate(mrng, undefined).value };
        }
        if (this.minLength === this.maxGeneratedLength) {
            return { size: this.lengthArb.generate(mrng, undefined).value, biasFactorItems: biasFactor };
        }
        if (mrng.nextInt(1, biasFactor) !== 1) {
            return { size: this.lengthArb.generate(mrng, undefined).value };
        }
        if (mrng.nextInt(1, biasFactor) !== 1 || this.minLength === this.maxGeneratedLength) {
            return { size: this.lengthArb.generate(mrng, undefined).value, biasFactorItems: biasFactor };
        }
        const maxBiasedLength = this.minLength + Math.floor(Math.log(this.maxGeneratedLength - this.minLength) / Math.log(2));
        const targetSizeValue = (0, Converters_1.convertToNext)((0, integer_1.integer)(this.minLength, maxBiasedLength)).generate(mrng, undefined);
        return { size: targetSizeValue.value, biasFactorItems: biasFactor };
    }
    canShrinkWithoutContext(value) {
        if (!Array.isArray(value) || this.minLength > value.length || value.length > this.maxLength) {
            return false;
        }
        for (let index = 0; index !== value.length; ++index) {
            if (!(index in value)) {
                return false;
            }
            if (!this.arb.canShrinkWithoutContext(value[index])) {
                return false;
            }
        }
        const filtered = this.preFilter(value.map((item) => new NextValue_1.NextValue(item, undefined)));
        return filtered.length === value.length;
    }
    shrinkItemByItem(value, safeContext, endIndex) {
        let shrinks = Stream_1.Stream.nil();
        for (let index = safeContext.startIndex; index < endIndex; ++index) {
            shrinks = shrinks.join((0, LazyIterableIterator_1.makeLazy)(() => this.arb
                .shrink(value[index], safeContext.itemsContexts[index])
                .map((v) => {
                const beforeCurrent = value
                    .slice(0, index)
                    .map((v, i) => new NextValue_1.NextValue((0, symbols_1.cloneIfNeeded)(v), safeContext.itemsContexts[i]));
                const afterCurrent = value
                    .slice(index + 1)
                    .map((v, i) => new NextValue_1.NextValue((0, symbols_1.cloneIfNeeded)(v), safeContext.itemsContexts[i + index + 1]));
                return [
                    beforeCurrent.concat(v).concat(afterCurrent),
                    undefined,
                    index,
                ];
            })));
        }
        return shrinks;
    }
    shrinkImpl(value, context) {
        if (value.length === 0) {
            return Stream_1.Stream.nil();
        }
        const safeContext = context !== undefined
            ? context
            : { shrunkOnce: false, lengthContext: undefined, itemsContexts: [], startIndex: 0 };
        return (this.lengthArb
            .shrink(value.length, safeContext.lengthContext)
            .drop(safeContext.shrunkOnce && safeContext.lengthContext === undefined && value.length > this.minLength + 1 ? 1 : 0)
            .map((lengthValue) => {
            const sliceStart = value.length - lengthValue.value;
            return [
                value
                    .slice(sliceStart)
                    .map((v, index) => new NextValue_1.NextValue((0, symbols_1.cloneIfNeeded)(v), safeContext.itemsContexts[index + sliceStart])),
                lengthValue.context,
                0,
            ];
        })
            .join((0, LazyIterableIterator_1.makeLazy)(() => value.length > this.minLength
            ? this.shrinkItemByItem(value, safeContext, 1)
            : this.shrinkItemByItem(value, safeContext, value.length)))
            .join(value.length > this.minLength
            ? (0, LazyIterableIterator_1.makeLazy)(() => {
                const subContext = {
                    shrunkOnce: false,
                    lengthContext: undefined,
                    itemsContexts: safeContext.itemsContexts.slice(1),
                    startIndex: 0,
                };
                return this.shrinkImpl(value.slice(1), subContext)
                    .filter((v) => this.minLength <= v[0].length + 1)
                    .map((v) => {
                    return [
                        [new NextValue_1.NextValue((0, symbols_1.cloneIfNeeded)(value[0]), safeContext.itemsContexts[0])].concat(v[0]),
                        undefined,
                        0,
                    ];
                });
            })
            : Stream_1.Stream.nil()));
    }
    shrink(value, context) {
        return this.shrinkImpl(value, context).map((contextualValue) => this.wrapper(contextualValue[0], true, contextualValue[1], contextualValue[2]));
    }
}
exports.ArrayArbitrary = ArrayArbitrary;
