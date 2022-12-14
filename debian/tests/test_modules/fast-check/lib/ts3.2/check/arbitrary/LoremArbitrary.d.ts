import { Arbitrary } from './definition/Arbitrary';
/**
 * For lorem ipsum strings of words
 */
declare function lorem(): Arbitrary<string>;
/**
 * For lorem ipsum string of words with maximal number of words
 * @param maxWordsCount Upper bound of the number of words allowed
 */
declare function lorem(maxWordsCount: number): Arbitrary<string>;
/**
 * For lorem ipsum string of words or sentences with maximal number of words or sentences
 * @param maxWordsCount Upper bound of the number of words/sentences allowed
 * @param sentencesMode If enabled, multiple sentences might be generated
 */
declare function lorem(maxWordsCount: number, sentencesMode: boolean): Arbitrary<string>;
export { lorem };
