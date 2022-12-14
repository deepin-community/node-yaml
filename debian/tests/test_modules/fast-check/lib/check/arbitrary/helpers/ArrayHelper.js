"use strict";
exports.__esModule = true;
function findOrUndefined(ts, f) {
    for (var i = 0; i < ts.length; i++) {
        var t = ts[i];
        if (f(t))
            return t;
    }
    return undefined;
}
exports.findOrUndefined = findOrUndefined;
