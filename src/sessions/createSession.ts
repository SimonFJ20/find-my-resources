import { compare } from "bcrypt";
import { Database } from "../database/Database";
import { User, UserId } from "../users/User";
import { randstr } from "../utils/random";
import { Session, SessionId } from "./Session";

export type CreateSessionArgs = {
    username: string,
    password: string,
};

export const createSession = async (args: CreateSessionArgs, db: Database) => {
    const user = await checkUser(args, db);
    const session = makeSession(await db.uniqueSessionId(), user.id);
    return await insertSession(session, db);
}

const checkUser = async (args: CreateSessionArgs, db: Database): Promise<User> => {
    const {username, password} = args;
    const user = await findUser(username, db);
    await checkPassword(password, user.passwordHash);
    return user;
}

const findUser = async (username: string, db: Database): Promise<User> => {
    const user = await db.userByUsername(username);
    if (user === null)
        throw new Error('unknown username/password');
    return user;
}

const checkPassword = async (password: string, hash: string) => {
    const passwordCorrect = await compare(password, hash);
    if (!passwordCorrect)
        throw new Error('unknown username/password');
}

const makeSession = (id: SessionId, userId: UserId): Session => {
    const token = randstr();
    const createdAt = new Date(Date.now());
    return {id, userId, token, createdAt};
}

const insertSession = async (session: Session, db: Database): Promise<Session> => {
    const res = await db.insertSession(session);
    if (!res.success)
        throw new Error('could not insert session: ' + res.error);
    return res.inserted[0];
}
