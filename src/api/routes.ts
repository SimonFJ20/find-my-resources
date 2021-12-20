import { Router } from "express";
import { Database } from "../database/Database";
import { authRoutes } from "./auth";

export const routes = (db: Database): Router => {
    const router = Router();

    router.use('/api/auth', authRoutes(db));

    return router
}
