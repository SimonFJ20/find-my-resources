import { Id, Identifyable } from "../database/Identifyable";

export type SessionId = Id;
export type Token = string;

export type Session = Identifyable<SessionId> & {
    userId: Id,
    token: Token,
    createdAt: Date
}
