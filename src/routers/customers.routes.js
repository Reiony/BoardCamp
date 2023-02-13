import { Router } from "express";
import {
  getCustomerbyId,
  getCustomers,
  newCustomer,
  updateCustomer,
} from "../controllers/customers.controllers.js";
import { validateCustomerSchema } from "../middlewares/customers.middleware.js";

const userRouter = Router();

userRouter.post("/customers", validateCustomerSchema, newCustomer);
userRouter.get("/customers", getCustomers);
userRouter.get("/customers/:id", getCustomerbyId);
userRouter.put("/customers/:id", validateCustomerSchema, updateCustomer);

export default userRouter;
