import { AsyncCommand } from './command/AsyncCommand';
import { Command } from './command/Command';
import { CommandsIterable } from './commands/CommandsIterable';
import { Scheduler } from '../arbitrary/AsyncSchedulerArbitrary';
declare type Setup<Model, Real> = () => {
    model: Model;
    real: Real;
};
declare type AsyncSetup<Model, Real> = () => Promise<{
    model: Model;
    real: Real;
}>;
/**
 * Run synchronous commands over a `Model` and the `Real` system
 *
 * Throw in case of inconsistency
 *
 * @param s Initial state provider
 * @param cmds Synchronous commands to be executed
 */
export declare const modelRun: <Model extends object, Real, InitialModel extends Model>(s: Setup<InitialModel, Real>, cmds: Iterable<Command<Model, Real>> | CommandsIterable<Model, Real, void, false>) => void;
/**
 * Run asynchronous commands over a `Model` and the `Real` system
 *
 * Throw in case of inconsistency
 *
 * @param s Initial state provider
 * @param cmds Asynchronous commands to be executed
 */
export declare const asyncModelRun: <Model extends object, Real, CheckAsync extends boolean, InitialModel extends Model>(s: Setup<InitialModel, Real> | AsyncSetup<InitialModel, Real>, cmds: Iterable<AsyncCommand<Model, Real, CheckAsync>> | CommandsIterable<Model, Real, Promise<void>, CheckAsync>) => Promise<void>;
/**
 * Run asynchronous and scheduled commands over a `Model` and the `Real` system
 *
 * Throw in case of inconsistency
 *
 * @param scheduler Scheduler
 * @param s Initial state provider
 * @param cmds Asynchronous commands to be executed
 */
export declare const scheduledModelRun: <Model extends object, Real, CheckAsync extends boolean, InitialModel extends Model>(scheduler: Scheduler, s: Setup<InitialModel, Real> | AsyncSetup<InitialModel, Real>, cmds: Iterable<AsyncCommand<Model, Real, CheckAsync>> | CommandsIterable<Model, Real, Promise<void>, CheckAsync>) => Promise<void>;
export {};
