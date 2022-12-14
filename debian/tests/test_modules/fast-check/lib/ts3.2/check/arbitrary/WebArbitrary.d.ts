export interface WebAuthorityConstraints {
    /** Enable IPv4 in host */
    withIPv4?: boolean;
    /** Enable IPv6 in host */
    withIPv6?: boolean;
    /** Enable extended IPv4 format */
    withIPv4Extended?: boolean;
    /** Enable user information prefix */
    withUserInfo?: boolean;
    /** Enable port suffix */
    withPort?: boolean;
}
/**
 * For web authority
 *
 * According to RFC 3986 - https://www.ietf.org/rfc/rfc3986.txt - `authority = [ userinfo "@" ] host [ ":" port ]`
 *
 * @param constraints
 */
export declare function webAuthority(constraints?: WebAuthorityConstraints): import("./definition/Arbitrary").Arbitrary<string>;
/**
 * For internal segment of an URI (web included)
 *
 * According to RFC 3986 - https://www.ietf.org/rfc/rfc3986.txt
 *
 * eg.: In the url `https://github.com/dubzzz/fast-check/`, `dubzzz` and `fast-check` are segments
 */
export declare function webSegment(): import("./definition/Arbitrary").Arbitrary<string>;
/**
 * For query parameters of an URI (web included)
 *
 * According to RFC 3986 - https://www.ietf.org/rfc/rfc3986.txt
 *
 * eg.: In the url `https://domain/plop/?hello=1&world=2`, `?hello=1&world=2` are query parameters
 */
export declare function webQueryParameters(): import("./definition/Arbitrary").Arbitrary<string>;
/**
 * For fragments of an URI (web included)
 *
 * According to RFC 3986 - https://www.ietf.org/rfc/rfc3986.txt
 *
 * eg.: In the url `https://domain/plop?page=1#hello=1&world=2`, `?hello=1&world=2` are query parameters
 */
export declare function webFragments(): import("./definition/Arbitrary").Arbitrary<string>;
export interface WebUrlConstraints {
    /** Enforce specific schemes, eg.: http, https */
    validSchemes?: string[];
    /** Settings for {@see webAuthority} */
    authoritySettings?: WebAuthorityConstraints;
    /** Enable query parameters in the generated url */
    withQueryParameters?: boolean;
    /** Enable fragments in the generated url */
    withFragments?: boolean;
}
/**
 * For web url
 *
 * According to RFC 3986 and WHATWG URL Standard
 * - https://www.ietf.org/rfc/rfc3986.txt
 * - https://url.spec.whatwg.org/
 *
 * @param constraints
 */
export declare function webUrl(constraints?: {
    validSchemes?: string[];
    authoritySettings?: WebAuthorityConstraints;
    withQueryParameters?: boolean;
    withFragments?: boolean;
}): import("./definition/Arbitrary").Arbitrary<string>;
