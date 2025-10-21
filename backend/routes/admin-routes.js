import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin-controllers.js";

export const router = Router();

router.post("/login-admin", loginAdmin);
router.post("/register-admin", registerAdmin);

