import { Router } from "express";
import { getRentals, postRentals, removeRentals, returnGame } from "../controllers/rentals.controllers.js";
import { rentalsSchemaValidation } from "../middlewares/rentals.middleware.js";


const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalsSchemaValidation, postRentals)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", returnGame)
rentalsRouter.delete("/rentals/:id", removeRentals)

export default rentalsRouter;