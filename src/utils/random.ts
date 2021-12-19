
export type RANDOM_INT_IN_RANGE = (min: number, max: number) => number;
export type RANDOM_CHAR = (chars?: string, randint?: RANDOM_INT_IN_RANGE) => string;
export type RANDOM_STRING = (length?: number, chars?: string, randint?: RANDOM_INT_IN_RANGE) => string;

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const randint: RANDOM_INT_IN_RANGE = (min, max) =>
    Math.floor(Math.random() * (max - min) + min)


export const randchar = (chars = CHARS, randomIntInRange = randint) =>
    chars.charAt(randomIntInRange(0, chars.length));

export const randstr: RANDOM_STRING = (length = 64, chars = CHARS, randomIntInRange = randint) =>
    length ? randstr(length - 1, chars, randomIntInRange) + randchar(chars, randomIntInRange) : '';

