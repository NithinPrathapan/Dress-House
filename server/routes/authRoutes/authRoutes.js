import express from "express";
import {
  login,
  logout,
  register,
  authmiddleware,
} from "../../controllers/auth/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authmiddleware, (req, res) => {
  const user = req.user;
  res
    .status(200)
    .json({ success: true, message: "Authenticated User", user: user });
});

export default router;
