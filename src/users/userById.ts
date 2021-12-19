import { Database } from "../database/Database";
import { User, UserId } from "./User";

export const userById = async (id: UserId, db: Database): Promise<User> => {
    const user = await db.user(id);
    if (user === null)
        throw new Error('user not found');
    return user;
}
