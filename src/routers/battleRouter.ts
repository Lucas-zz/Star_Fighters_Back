import { Router } from "express";
import * as battleController from "../controllers/battleController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import battleSchema from "../schemas/battleSchema.js";

const battleRouter = Router();

battleRouter.post("/battle", validateSchema(battleSchema), battleController.battle);
battleRouter.get("/ranking");

export default battleRouter;