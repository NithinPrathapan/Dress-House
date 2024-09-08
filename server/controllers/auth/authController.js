import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

// register
export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // password hash
    const hashPassword = bcrypt.hash(password, 12);
    const newUser = new User({
      userName: userName,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "registration success", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "false", message: "some error occured" });
  }
};

// login
export const login = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "false", message: "some error occured" });
  }
};

// logout

// authmiddleware
