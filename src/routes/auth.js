import express from "express";
import * as auth from "../controllers/auth.js";
import res from "express/lib/response.js";

const router = express.Router();

router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);

export default router;

