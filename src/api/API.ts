import cors from "cors";
import express, { json } from "express";
import { Server } from "http";

export class API {

    private port: number;
    private server?: Server;

    constructor (port: number) {
        this.port = port;
    }

    public async start(): Promise<void> {
        const app = express();
        app.use(cors(), json());
        return new Promise((resolve) => {
            if (this.server === undefined)
                this.server = app.listen(this.port, () => resolve());
            else
                this.server.listen(this.port, () => resolve());
        });
    }

    public async stop(): Promise<void> {
        return new Promise((resolve) => {
            this.server?.close(() => resolve())
        });
    }

}
