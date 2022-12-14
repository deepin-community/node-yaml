import { Random } from '../../random/generator/Random';
import { Arbitrary } from '../arbitrary/definition/Arbitrary';
import { Shrinkable } from '../arbitrary/definition/Shrinkable';
import { PreconditionFailure } from '../precondition/PreconditionFailure';
import { IRawProperty } from './IRawProperty';
/**
 * Interface for synchronous property, see {@link IRawProperty}
 */
export interface IProperty<Ts> extends IRawProperty<Ts, false> {
}
declare type HookFunction = () => void;
/**
 * Property, see {@link IProperty}
 *
 * Prefer using {@link property} instead
 */
export declare class Property<Ts> implements IProperty<Ts> {
    readonly arb: Arbitrary<Ts>;
    readonly predicate: (t: Ts) => boolean | void;
    static dummyHook: HookFunction;
    private beforeEachHook;
    private afterEachHook;
    constructor(arb: Arbitrary<Ts>, predicate: (t: Ts) => boolean | void);
    isAsync: () => false;
    generate(mrng: Random, runId?: number): Shrinkable<Ts>;
    run(v: Ts): PreconditionFailure | string | null;
    /**
     * Define a function that should be called before all calls to the predicate
     * @param hookFunction Function to be called
     */
    beforeEach(invalidHookFunction: () => Promise<unknown>): 'beforeEach expects a synchronous function but was given a function returning a Promise';
    beforeEach(validHookFunction: HookFunction): Property<Ts>;
    /**
     * Define a function that should be called after all calls to the predicate
     * @param hookFunction Function to be called
     */
    afterEach(invalidHookFunction: () => Promise<unknown>): 'afterEach expects a synchronous function but was given a function returning a Promise';
    afterEach(validHookFunction: HookFunction): Property<Ts>;
}
export {};
