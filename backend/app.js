import express from "express";
import { router } from "./routes/preference-routes.js";
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

app.use('',router);

export default app;