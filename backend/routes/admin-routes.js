import { Router } from "express";
import { addProduct, loginAdmin } from "../controllers/admin-controllers.js";

export const router = Router();

router.post("/login-admin", loginAdmin);
router.post("/add-product", addProduct);

