import { Router } from "express";
import gamesRouter from "./games.routes.js";


const AllRoutes = Router();

AllRoutes.use(gamesRouter);

export default AllRoutes;