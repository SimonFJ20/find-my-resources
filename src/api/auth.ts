import { Router } from "express";
import { Database } from "../database/Database";
import { registerUser } from "../users/registerUser";
import { User } from "../users/User";
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
        const error = catchedError(catchedError, res);
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

export const authRoutes = (db: Database): Router => {
    const router = Router();

    router.post('/register', registerHandler);
    

    return router;
}
