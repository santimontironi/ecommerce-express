import { Router } from "express";
import { getAllProducts, deleteProduct, addProduct, getProductById } from "../controllers/product-controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/upload.js";

export const router = Router();

router.get("/admin-productos", verifyToken, getAllProducts);
router.post("/add-product", verifyToken, upload.single("image"), addProduct);
router.delete("/delete-product/:productId", verifyToken, deleteProduct);
router.get("/productos", getAllProducts);
router.get("/producto/:productId", getProductById);