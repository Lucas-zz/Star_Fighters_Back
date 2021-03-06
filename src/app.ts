import cors from "cors";
import 'express-async-errors';
import express, { json, Request, Response, NextFunction } from "express";
import battleRouter from "./routers/battleRouter";

const app = express();

app.use(cors());
app.use(json());
app.use(battleRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if (error.response) {
        return res.sendStatus(error.response.status);
    }

    res.sendStatus(500);
});

export default app;