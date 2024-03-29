import { Arbitrary } from '../check/arbitrary/definition/Arbitrary';
/**
 * For single characters - all values in 0x0000-0xffff can be generated
 *
 * WARNING:
 *
 * Some generated characters might appear invalid regarding UCS-2 and UTF-16 encoding.
 * Indeed values within 0xd800 and 0xdfff constitute surrogate pair characters and are illegal without their paired character.
 *
 * @remarks Since 0.0.11
 * @public
 */
export declare function char16bits(): Arbitrary<string>;
