export function stringToBase64Mapper(s) {
    switch (s.length % 4) {
        case 0:
            return s;
        case 3:
            return `${s}=`;
        case 2:
            return `${s}==`;
        default:
            return s.slice(1);
    }
}
export function stringToBase64Unmapper(value) {
    if (typeof value !== 'string' || value.length % 4 !== 0) {
        throw new Error('Invalid string received');
    }
    const lastTrailingIndex = value.indexOf('=');
    if (lastTrailingIndex === -1) {
        return value;
    }
    const numTrailings = value.length - lastTrailingIndex;
    if (numTrailings > 2) {
        throw new Error('Cannot unmap the passed value');
    }
    return value.substring(0, lastTrailingIndex);
}
