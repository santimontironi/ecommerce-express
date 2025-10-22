import { getAllProducts } from "../controllers/admin-controllers.js";
import { Router } from "express";

export const router = Router();

router.get("/productos", getAllProducts);