import { Id, Identifyable } from "../database/Identifyable";

export type SessionId = Id

export type Session = Identifyable<SessionId> & {
    userId: Id,
    token: string,
    createdAt: Date
}
