import { Resource, ResourceId } from "../resources/Resource";
import { Session, SessionId } from "../sessions/Session";
import { User, UserId } from "../users/User";
import { InsertRes } from "./responses";

export interface Database {

    
    uniqueUserId(): Promise<UserId>;
    user(id: UserId): Promise<User | null>;
    userByUsername(username: string): Promise<User | null>;
    insertUser(user: User): Promise<InsertRes<User>>;

    uniqueSessionId(): Promise<SessionId>;
    insertSession(session: Session): Promise<InsertRes<Session>>;

    uniqueResourceId(): Promise<ResourceId>;
    resourceByTitle(title: string): Promise<Resource | null>;
    insertResource(resource: Resource): Promise<InsertRes<Resource>>;

}
