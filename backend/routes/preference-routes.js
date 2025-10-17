import { Router } from "express";
import { createPreference } from "../controllers/preference-controller.js";

export const router = Router();

router.post("/create-preference", createPreference);
