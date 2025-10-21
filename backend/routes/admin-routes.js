import { Router } from "express";
import { addProduct } from "../controllers/admin-controllers.js";

export const router = Router();

router.post("/add-product", addProduct);

