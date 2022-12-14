import { Arbitrary } from './definition/Arbitrary';
export interface RecordConstraints {
    /** Allow to remove keys from the generated record */
    withDeletedKeys?: boolean;
    /** @depreciated Prefer withDeletedKeys */
    with_deleted_keys?: boolean;
}
interface DeletedKeys {
    withDeletedKeys: true;
}
interface DeletedKeysDepreciated {
    with_deleted_keys: true;
}
declare type ConstrainedArbitrary<T, Constraints> = Constraints extends DeletedKeys | DeletedKeysDepreciated ? Arbitrary<Partial<T>> : Arbitrary<T>;
/**
 * For records following the `recordModel` schema
 *
 * @example
 * ```typescript
 * record({ x: someArbitraryInt, y: someArbitraryInt }): Arbitrary<{x:number,y:number}>
 * // merge two integer arbitraries to produce a {x, y} record
 * ```
 *
 * @param recordModel Schema of the record
 */
declare function record<T>(recordModel: {
    [K in keyof T]: Arbitrary<T[K]>;
}): Arbitrary<{
    [K in keyof T]: T[K];
}>;
/**
 * For records following the `recordModel` schema
 *
 * @example
 * ```typescript
 * record({ x: someArbitraryInt, y: someArbitraryInt }, {withDeletedKeys: true}): Arbitrary<{x?:number,y?:number}>
 * // merge two integer arbitraries to produce a {x, y}, {x}, {y} or {} record
 * ```
 *
 * @param recordModel Schema of the record
 * @param constraints Contraints on the generated record
 */
declare function record<T, Constraints extends RecordConstraints>(recordModel: {
    [K in keyof T]: Arbitrary<T[K]>;
}, constraints: Constraints): ConstrainedArbitrary<{
    [K in keyof T]: T[K];
}, Constraints>;
export { record };
