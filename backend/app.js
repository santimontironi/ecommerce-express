import express from "express";
import { router as preferenceRouter } from "./routes/preference-routes.js";
import { router as adminRouter } from "./routes/admin-routes.js";
import {router as productsRouter} from "./routes/product-routes.js";
import {router as userRouter} from "./routes/user-routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use('', preferenceRouter);
app.use('', adminRouter);
app.use('', productsRouter);
app.use('', userRouter);

export default app;