import express from "express";
import { router as preferenceRouter } from "./routes/preference-routes.js";
import { router as adminRouter } from "./routes/admin-routes.js";
import {router as productsRouter} from "./routes/product-routes.js";
import {router as userRouter} from "./routes/user-routes.js";
import connectDB from "./bd/bd.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors( 
    {
        origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:5173",
        credentials: true
    }
))

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Error de conexión DB:', error);
    return res.status(500).json({ 
      error: 'Error de conexión a base de datos',
      details: error.message 
    });
  }
});

app.use('', preferenceRouter);
app.use('', adminRouter);
app.use('', productsRouter);
app.use('', userRouter);

const __filename = fileURLToPath(import.meta.url); 
// Convierte la URL del módulo actual en la ruta de archivo completa

const __dirname = path.dirname(__filename); 
// Obtiene la carpeta donde se encuentra este archivo

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
// Sirve los archivos de la carpeta "uploads" de forma pública en la ruta /uploads

export default app;