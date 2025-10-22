import { Router } from "express";
import { addProduct, loginAdmin, dashboardAdmin, getAllProducts, deleteProduct } from "../controllers/admin-controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const router = Router();

router.post("/login-admin", loginAdmin);
router.get("/dashboard-admin", verifyToken, dashboardAdmin);
router.get("/admin-productos", verifyToken, getAllProducts);
router.post("/add-product", addProduct);
router.delete("/delete-product/:productId", verifyToken, deleteProduct);

