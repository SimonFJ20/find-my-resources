import { RequestHandler, Response } from "express"
import { Dictionary } from "../utils/Dictionary"


export type ErrorRes = {
    error?: any,
}


export type Handler<
    ResBody = any,
    ReqBody = any,
    Params = Dictionary<string>,
    ReqQuery = Dictionary<string>
> = RequestHandler<Params, ResBody | ErrorRes, ReqBody, ReqQuery>

export const internalServerError = (res: Response<ErrorRes>) => {
    res.status(500).json({error: 'internal server error'});
}

export const logError = (url: string, error: Error) => {
    console.error(`[API] Error on route ${url}\nError: ${error.message}`);
}

export const catchedError = (catched: unknown, res: Response<ErrorRes>) => {
    if (!(catched instanceof Error)) {
        internalServerError(res);
        throw catched;
    }
    return catched as Error;
}
