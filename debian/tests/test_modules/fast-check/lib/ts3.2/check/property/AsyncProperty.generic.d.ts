import { Random } from '../../random/generator/Random';
import { Arbitrary } from '../arbitrary/definition/Arbitrary';
import { Shrinkable } from '../arbitrary/definition/Shrinkable';
import { PreconditionFailure } from '../precondition/PreconditionFailure';
import { IRawProperty } from './IRawProperty';
/**
 * Interface for asynchronous property, see {@link IRawProperty}
 */
export interface IAsyncProperty<Ts> extends IRawProperty<Ts, true> {
}
declare type HookFunction = (() => Promise<unknown>) | (() => void);
/**
 * Asynchronous property, see {@link IAsyncProperty}
 *
 * Prefer using {@link asyncProperty} instead
 */
export declare class AsyncProperty<Ts> implements IAsyncProperty<Ts> {
    readonly arb: Arbitrary<Ts>;
    readonly predicate: (t: Ts) => Promise<boolean | void>;
    static dummyHook: HookFunction;
    private beforeEachHook;
    private afterEachHook;
    constructor(arb: Arbitrary<Ts>, predicate: (t: Ts) => Promise<boolean | void>);
    isAsync: () => true;
    generate(mrng: Random, runId?: number): Shrinkable<Ts>;
    run(v: Ts): Promise<PreconditionFailure | string | null>;
    /**
     * Define a function that should be called before all calls to the predicate
     * @param hookFunction Function to be called
     */
    beforeEach(hookFunction: HookFunction): AsyncProperty<Ts>;
    /**
     * Define a function that should be called after all calls to the predicate
     * @param hookFunction Function to be called
     */
    afterEach(hookFunction: HookFunction): AsyncProperty<Ts>;
}
export {};
