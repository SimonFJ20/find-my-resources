import { Id, Identifyable } from "../database/Identifyable";
import { UserId } from "../users/User";

export type ResourceId = Id;

export type Resource = Identifyable<ResourceId> & {
    creator: UserId,
    title: string,
    tags: string[],
    link: string,
    text: string,
}
