import { Id, Identifyable } from "../database/Identifyable"

export type UserId = Id;

export type User = Identifyable<UserId> & {
    username: string,
    passwordHash: string,
};


