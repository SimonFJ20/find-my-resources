import { ErrorRequestHandler } from "express";
import { ErrorRes } from "./utils";


export  const jsonError = (): ErrorRequestHandler<any, ErrorRes> => async (error, req, res, next) => {
    if (error && error.type && error.type === 'entity.parse.failed')
        console.error(`${new Date().toISOString()} [API]: Recieved request with invalid JSON request body`);
    res.status(400).json({error});
}
