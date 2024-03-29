"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patternsToStringUnmapperFor = exports.patternsToStringMapper = void 0;
const MaxLengthFromMinLength_1 = require("../helpers/MaxLengthFromMinLength");
function patternsToStringMapper(tab) {
    return tab.join('');
}
exports.patternsToStringMapper = patternsToStringMapper;
function patternsToStringUnmapperFor(patternsArb, constraints) {
    return function patternsToStringUnmapper(value) {
        if (typeof value !== 'string') {
            throw new Error('Unsupported value');
        }
        const minLength = constraints.minLength !== undefined ? constraints.minLength : 0;
        const maxLength = constraints.maxLength !== undefined ? constraints.maxLength : MaxLengthFromMinLength_1.MaxLengthUpperBound;
        if (value.length === 0) {
            if (minLength > 0) {
                throw new Error('Unable to unmap received string');
            }
            return [];
        }
        const stack = [{ endIndexChunks: 0, nextStartIndex: 1, chunks: [] }];
        while (stack.length > 0) {
            const last = stack.pop();
            for (let index = last.nextStartIndex; index <= value.length; ++index) {
                const chunk = value.substring(last.endIndexChunks, index);
                if (patternsArb.canShrinkWithoutContext(chunk)) {
                    const newChunks = last.chunks.concat([chunk]);
                    if (index === value.length) {
                        if (newChunks.length < minLength || newChunks.length > maxLength) {
                            break;
                        }
                        return newChunks;
                    }
                    stack.push({ endIndexChunks: last.endIndexChunks, nextStartIndex: index + 1, chunks: last.chunks });
                    stack.push({ endIndexChunks: index, nextStartIndex: index + 1, chunks: newChunks });
                    break;
                }
            }
        }
        throw new Error('Unable to unmap received string');
    };
}
exports.patternsToStringUnmapperFor = patternsToStringUnmapperFor;
