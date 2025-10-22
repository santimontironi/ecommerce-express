import { getAllProducts, getProductById } from "../controllers/user-controllers.js";
import { Router } from "express";

export const router = Router();

router.get("/productos", getAllProducts);
router.get("/producto/:productId", getProductById);