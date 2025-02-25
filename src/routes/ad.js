import express from "express";
import * as ad from "../controllers/ad.js";
import {requireSignIn} from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-image", requireSignIn, upload.any(), ad.uploadImage);
router.delete("/remove-image", requireSignIn, ad.removeImage);
router.post("/create-ad", requireSignIn, ad.createAd);

export default router;

