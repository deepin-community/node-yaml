/**
 * For domains
 * having an extension with at least two lowercase characters
 *
 * According to RFC 1034, RFC 1123 and WHATWG URL Standard
 * - https://www.ietf.org/rfc/rfc1034.txt
 * - https://www.ietf.org/rfc/rfc1123.txt
 * - https://url.spec.whatwg.org/
 */
export declare function domain(): import("./definition/Arbitrary").Arbitrary<string>;
/** @hidden */
export declare function hostUserInfo(): import("./definition/Arbitrary").Arbitrary<string>;
