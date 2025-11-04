import { Router } from "express";
import { createPreference, handleWebhook } from "../controllers/preference-controller.js";

export const router = Router();

router.post("/create-preference", createPreference);
router.post("/webhook", handleWebhook);
