import { Router } from "express";
import { Database } from "../database/Database";
import { createSession } from "../sessions/createSession";
import { Token } from "../sessions/Session";
import { registerUser } from "../users/registerUser";
import { User, UserId } from "../users/User";
import { catchedError, Handler, internalServerError, logError } from "./utils";

type RegisterReq = {
    username: string,
    password: string
}

type RegisterRes = {
    user: User
}

export const registerHandler = (db: Database): Handler<RegisterRes, RegisterReq> =>
async (req, res) => {
    try {
        const user = await registerUser(req.body, db);
        res.status(200).json({user});
    } catch (catched) {
        const error = catchedError(catched, res);
        switch (error.message) {
            case 'no username specified':
            case 'username taken':
                res.status(400).json({error: error.message});
                break;
            default:
                internalServerError(res);
                logError(req.path, error);
        }
    }
}

type LoginReq = {
    username: string,
    password: string
}

type LoginRes = {
    token: Token,
    userId: UserId,
}

export const loginHandler = (db: Database): Handler<LoginRes, LoginReq> =>
async (req, res) => {
    try {
        const {username, password} = req.body;
        const {token, userId} = await createSession({username, password}, db);
        res.status(200).json({token, userId});
    } catch (catched) {
        const error = catchedError(catched, res);
    }
}

export const authRoutes = (db: Database): Router => {
    const router = Router();

    router.post('/register', registerHandler);
    

    return router;
}
