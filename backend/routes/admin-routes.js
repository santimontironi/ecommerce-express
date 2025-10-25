import { Router } from "express";
import { addProduct, loginAdmin, dashboardAdmin, getAllProducts, deleteProduct } from "../controllers/admin-controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/upload.js";

export const router = Router();

router.post("/login-admin", loginAdmin);
router.get("/dashboard-admin", verifyToken, dashboardAdmin);
router.get("/admin-productos", verifyToken, getAllProducts);
router.post("/add-product", verifyToken, upload.single("image"), addProduct);
router.delete("/delete-product/:productId", verifyToken, deleteProduct);

