import { hash } from 'bcrypt';
import { Database } from '../database/Database';
import { User } from './User';

type RegisterUserArgs = {
    username: string,
    password: string
}

export const registerUser = async (args: RegisterUserArgs, db: Database): Promise<User> => {
    const {username, password} = args;
    const passwordHash = await hash(password, 10);
    await validateUsername(username, db);
    const id = await db.uniqueUserId();
    return await insertUser({id, username, passwordHash}, db);
}

const validateUsername = async (username: string, db: Database) => {
    if (typeof(username) !== 'string' || username === '')
        throw new Error('no username specified');
    if (!await usernameTaken(username, db))
        throw new Error('username taken');
}

const usernameTaken = async (username: string, db: Database): Promise<boolean> => {
    return await db.userByUsername(username) !== null;
}

const insertUser = async (user: User, db: Database): Promise<User> => {
    const res = await db.insertUser(user);
    if (!res.success)
        throw new Error('could not insert user: ' + res.error);
    return res.inserted[0];
}
