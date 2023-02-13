import express from "express";
import cors from "cors";
import AllRoutes from "./routers/routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(AllRoutes);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server running on port ${port}`));