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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nunodeportes.netlify.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

const initializeApp = async () => {
  try {
    await connectDB();
    console.log('✅ Base de datos conectada');
    
    await createAdmin();
    console.log('✅ Admin verificado/creado');
  } catch (error) {
    console.error('❌ Error inicializando app:', error);
    // No lanzar error para que la app siga funcionando
  }
};

initializeApp();

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