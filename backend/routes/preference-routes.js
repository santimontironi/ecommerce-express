import { Router } from "express";
import helloWord from "../controllers/preference-controller.js";

export const router = Router();

router.get("/", helloWord);