import express from "express";
import * as auth from "../controllers/auth.js";
import res from "express/lib/response.js";
import {requireSignIn} from "../middleware/auth.js";

const router = express.Router();

router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);

router.get("/current-user", requireSignIn, auth.currentUser);
router.put("/update-password", requireSignIn, auth.updatePassword);
router.put("/update-username", requireSignIn, auth.updateUsername);

export default router;

