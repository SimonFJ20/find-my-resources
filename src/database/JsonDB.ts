import { Resource } from "../resources/Resource";
import { Session } from "../sessions/Session";
import { User } from "../users/User";
import { randstr } from "../utils/random";
import { Database } from "./Database";
import { InsertRes } from "./responses";

export class JsonDB implements Database {
    
    private filename: string;

    private data: {
        users: User[],
        sessions: Session[],
        resources: Resource[],
    };

    constructor (filename: string) {
        this.filename = filename;
        this.data = {
            users: [],
            sessions: [],
            resources: [],
        };
    }

    public async uniqueUserId(): Promise<string> {
        let id = randstr();
        while (this.data.users.find((u) => u.id === id) !== undefined)
            id = randstr();
        return id;
    }

    public async user(id: string): Promise<User | null> {
        return this.data.users.find((u) => u.id === id) ?? null;
    }

    public async userByUsername(username: string): Promise<User | null> {
        return this.data.users.find((u) => u.username === username) ?? null;
    }

    public async insertUser(user: User): Promise<InsertRes<User>> {
        this.data.users.push(user);
        return {
            success: true,
            amount: 1,
            inserted: [user]
        }
    }

    public async uniqueSessionId(): Promise<string> {
        let id = randstr();
        while (this.data.sessions.find((s) => s.id === id) !== undefined)
            id = randstr();
        return id;
    }

    public async insertSession(session: Session): Promise<InsertRes<Session>> {
        this.data.sessions.push(session);
        return {
            success: true,
            amount: 1,
            inserted: [session]
        }
    }

    public async uniqueResourceId(): Promise<string> {
        let id = randstr();
        while (this.data.resources.find((r) => r.id === id) !== undefined)
            id = randstr();
        return id;
    }

    public async resourceByTitle(title: string): Promise<Resource | null> {
        return this.data.resources.find((r) => r.title === title) ?? null;
    }

    public async insertResource(resource: Resource): Promise<InsertRes<Resource>> {
        this.data.resources.push(resource);
        return {
            success: true,
            amount: 1,
            inserted: [resource]
        }
    }

}
