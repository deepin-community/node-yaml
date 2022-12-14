import { Arbitrary } from './definition/Arbitrary';
/**
 * For strings using the characters produced by `charArb`
 */
declare function stringOf(charArb: Arbitrary<string>): Arbitrary<string>;
/**
 * For strings using the characters produced by `charArb`
 * @param maxLength Upper bound of the generated string length
 */
declare function stringOf(charArb: Arbitrary<string>, maxLength: number): Arbitrary<string>;
/**
 * For strings using the characters produced by `charArb`
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function stringOf(charArb: Arbitrary<string>, minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link char}
 */
declare function string(): Arbitrary<string>;
/**
 * For strings of {@link char}
 * @param maxLength Upper bound of the generated string length
 */
declare function string(maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link char}
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function string(minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link ascii}
 */
declare function asciiString(): Arbitrary<string>;
/**
 * For strings of {@link ascii}
 * @param maxLength Upper bound of the generated string length
 */
declare function asciiString(maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link ascii}
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function asciiString(minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link string16bits}
 */
declare function string16bits(): Arbitrary<string>;
/**
 * For strings of {@link string16bits}
 * @param maxLength Upper bound of the generated string length
 */
declare function string16bits(maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link string16bits}
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function string16bits(minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link unicode}
 */
declare function unicodeString(): Arbitrary<string>;
/**
 * For strings of {@link unicode}
 * @param maxLength Upper bound of the generated string length
 */
declare function unicodeString(maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link unicode}
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function unicodeString(minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link fullUnicode}
 */
declare function fullUnicodeString(): Arbitrary<string>;
/**
 * For strings of {@link fullUnicode}
 * @param maxLength Upper bound of the generated string length
 */
declare function fullUnicodeString(maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link fullUnicode}
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function fullUnicodeString(minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link hexa}
 */
declare function hexaString(): Arbitrary<string>;
/**
 * For strings of {@link hexa}
 * @param maxLength Upper bound of the generated string length
 */
declare function hexaString(maxLength: number): Arbitrary<string>;
/**
 * For strings of {@link hexa}
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function hexaString(minLength: number, maxLength: number): Arbitrary<string>;
/**
 * For base64 strings
 *
 * A base64 string will always have a length multiple of 4 (padded with =)
 */
declare function base64String(): Arbitrary<string>;
/**
 * For base64 strings
 *
 * A base64 string will always have a length multiple of 4 (padded with =)
 *
 * @param maxLength Upper bound of the generated string length
 */
declare function base64String(maxLength: number): Arbitrary<string>;
/**
 * For base64 strings
 *
 * A base64 string will always have a length multiple of 4 (padded with =)
 *
 * @param minLength Lower bound of the generated string length
 * @param maxLength Upper bound of the generated string length
 */
declare function base64String(minLength: number, maxLength: number): Arbitrary<string>;
export { stringOf, string, asciiString, string16bits, unicodeString, fullUnicodeString, hexaString, base64String };
