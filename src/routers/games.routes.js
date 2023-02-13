import { Router } from "express";
import { createGames, getGames } from "../controllers/games.controllers.js";
import { gamesSchemaValidation } from "../middlewares/games.middleware.js";

const gamesRouter = Router();

gamesRouter.post("/games", gamesSchemaValidation, createGames);
gamesRouter.get("/games", getGames);

export default gamesRouter;
