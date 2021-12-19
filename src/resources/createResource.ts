import { Database } from "../database/Database";
import { UserId } from "../users/User";
import { Resource } from "./Resource";

export type CreateResourceArgs = {
    creator: UserId,
    title: string,
    tags: string[],
    link: string,
    text: string,
};

export const createResource = async (args: CreateResourceArgs, db: Database): Promise<Resource> => {
    const {creator, title, tags: unfilteredTags, link, text} = args;
    await checkUser(creator, db);
    await validateTitle(title, db);
    const tags = filterTags(unfilteredTags);
    const id = await db.uniqueResourceId();
    const resource: Resource = {id, creator, title, tags, link, text};
    return await insertResource(db, resource);
}

const checkUser = async (creator: UserId, db: Database) => {
    const user = await db.user(creator);
    if (user === null)
        throw new Error('could not find user');
}

const validateTitle = async (title: string, db: Database) => {
    if (typeof(title) !== 'string' || title === '')
        throw new Error('title empty');
    if (await db.resourceByTitle(title) !== undefined)
        throw new Error('title not uniqe');
}

const filterTags = (tags: string[]) => {
    return tags.filter(t => typeof(t) === 'string' && t !== '');
}

const insertResource = async (db: Database, resource: Resource) => {
    const res = await db.insertResource(resource);
    if (!res.success)
        throw new Error('could not insert resource: ' + res.error);
    return res.inserted[0];
}

