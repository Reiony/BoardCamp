import { Router } from "express";
import userRouter from "./customers.routes.js";
import gamesRouter from "./games.routes.js";
import rentalsRouter from "./rentals.routes.js";

const AllRoutes = Router();

AllRoutes.use([gamesRouter, userRouter,rentalsRouter]);

export default AllRoutes;
