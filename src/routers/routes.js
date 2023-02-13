import { Router } from "express";
import userRouter from "./customers.routes.js";
import gamesRouter from "./games.routes.js";

const AllRoutes = Router();

AllRoutes.use([gamesRouter, userRouter]);

export default AllRoutes;
