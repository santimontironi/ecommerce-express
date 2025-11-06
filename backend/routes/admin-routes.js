import { Router } from "express";
import { loginAdmin, dashboardAdmin, logoutAdmin, createAdmin } from "../controllers/admin-controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const router = Router();

router.post("/login-admin", loginAdmin);
router.get("/dashboard-admin", verifyToken, dashboardAdmin);
router.post("/logout-admin", verifyToken, logoutAdmin);
router.post("/create-admin", createAdmin);