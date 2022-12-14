import { Arbitrary } from './definition/Arbitrary';
/**
 * Execution context attached to one predicate run
 */
export interface Context {
    /**
     * Log execution details during a test.
     * Very helpful when troubleshooting failures
     * @param data Data to be logged into the current context
     */
    log(data: string): void;
    /**
     * Number of logs already logged into current context
     */
    size(): number;
}
/**
 * Produce a {@link Context} instance
 */
export declare const context: () => Arbitrary<Context>;
