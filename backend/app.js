import express from "express";
import { router as preferenceRouter } from "./routes/preference-routes.js";
import { router as adminRouter } from "./routes/admin-routes.js";
import {router as userRouter} from "./routes/user-routes.js"
import connectDB from "./bd/bd.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
))

connectDB();

app.use('', preferenceRouter);
app.use('', adminRouter);
app.use('', userRouter);

export default app;