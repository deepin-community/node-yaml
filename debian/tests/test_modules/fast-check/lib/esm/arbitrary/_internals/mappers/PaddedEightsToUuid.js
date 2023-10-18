export function paddedEightsToUuidMapper(t) {
    return `${t[0]}-${t[1].substring(4)}-${t[1].substring(0, 4)}-${t[2].substring(0, 4)}-${t[2].substring(4)}${t[3]}`;
}
const UuidRegex = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/;
export function paddedEightsToUuidUnmapper(value) {
    if (typeof value !== 'string') {
        throw new Error('Unsupported type');
    }
    const m = UuidRegex.exec(value);
    if (m === null) {
        throw new Error('Unsupported type');
    }
    return [m[1], m[3] + m[2], m[4] + m[5].substring(0, 4), m[5].substring(4)];
}
