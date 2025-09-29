import express from "express";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authenticated users can see their profile
router.get("/profile", authenticate, (req, res) => {
    res.json({
        message: "Profile data",
        user: req.user, // comes from middleware
    });
});


// Only admins can access this route
router.get("/admin", authenticate, requireAdmin, (req, res) => {
    res.json({
        message: "Welcome, admin!",
        user: req.user,
    });
});

export default router;