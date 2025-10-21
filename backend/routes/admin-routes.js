import { Router } from "express";
import { addProduct, loginAdmin, dashboardAdmin } from "../controllers/admin-controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const router = Router();

router.post("/login-admin", loginAdmin);
router.get("/dashboard-admin", verifyToken, dashboardAdmin);
router.post("/add-product", addProduct);

