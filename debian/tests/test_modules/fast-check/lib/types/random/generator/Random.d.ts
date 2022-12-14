import * as prand from 'pure-rand';
export declare class Random {
    private internalRng;
    private static MIN_INT;
    private static MAX_INT;
    private static DBL_FACTOR;
    private static DBL_DIVISOR;
    /**
     * Create a mutable random number generator
     * @param internalRng Immutable random generator from pure-rand library
     */
    constructor(internalRng: prand.RandomGenerator);
    /**
     * Clone the random number generator
     */
    clone(): Random;
    private uniformIn;
    /**
     * Generate an integer having `bits` random bits
     * @param bits Number of bits to generate
     */
    next(bits: number): number;
    /**
     * Generate a random boolean
     */
    nextBoolean(): boolean;
    /**
     * Generate a random integer (32 bits)
     */
    nextInt(): number;
    /**
     * Generate a random integer between min (included) and max (included)
     * @param min Minimal integer value
     * @param max Maximal integer value
     */
    nextInt(min: number, max: number): number;
    /**
     * Generate a random any between min (included) and max (included)
     * @param min Minimal any value
     * @param max Maximal any value
     */
    nextBigInt(min: any, max: any): any;
    /**
     * Generate a random floating point number between 0.0 (included) and 1.0 (excluded)
     */
    nextDouble(): number;
}
