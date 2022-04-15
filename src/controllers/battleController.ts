import { Request, Response } from "express";
import * as battleService from "../services/battleService.js";

export async function battle(req: Request, res: Response) {
    const { firstUser, secondUser } = req.body;

    if (!firstUser || !secondUser) {
        return res.sendStatus(422);
    }

    const battleResult = await battleService.battle(firstUser, secondUser);

    res.send(battleResult);
}

export async function getRanks(req: Request, res: Response) {
    const ranks = await battleService.getAll();

    res.send(ranks);
}