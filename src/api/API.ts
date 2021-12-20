import cors from "cors";
import express, { json } from "express";
import { Server } from "http";
import { Database } from "../database/Database";
import { jsonError } from "./jsonError";
import { routes } from "./routes";

export class API {

    private port: number;
    private db: Database;

    private server?: Server;

    constructor (port: number, db: Database) {
        this.db = db;
        this.port = port;
    }

    public async start(): Promise<void> {
        if (this.server === undefined) 
            return await this.makeNewServer();
        else 
            return this.startExistingServer();
    }

    public async stop(): Promise<void> {
        return new Promise((resolve) => {
            this.server?.close(() => resolve())
        });
    }

    public async discard(): Promise<void> {
        if (this.server === undefined) return;
        await this.stop();
        this.server = undefined;
    }

    private makeNewServer = async (): Promise<void> => {
        const app = express();
        app.use(cors(), json(), jsonError());
        app.use(routes(this.db));
        return new Promise((resolve) => 
            this.server = app.listen(this.port, () => resolve()));
    }

    private startExistingServer = async (): Promise<void> => {
        return new Promise((resolve) => 
            this.server?.listen(this.port, () => resolve()));
    }

}
