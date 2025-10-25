import express from "express";
import { router as preferenceRouter } from "./routes/preference-routes.js";
import { router as adminRouter } from "./routes/admin-routes.js";
import {router as userRouter} from "./routes/user-routes.js"
import connectDB from "./bd/bd.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))

connectDB();

app.use('', preferenceRouter);
app.use('', adminRouter);
app.use('', userRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

export default app;