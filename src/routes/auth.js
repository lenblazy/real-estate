import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {

    res.json({
        ...req.body,
        message: "Logged in successfully"
    })
});

export default router;

