import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

// register
export const register = async (req, res) => {
  console.log("fn called");
  const { userName, email, password } = req.body;
  try {
    // password hash
    const checkUserWithEmail = await User.findOne({ email: email });
    if (checkUserWithEmail) {
      return res.json({
        success: false,
        message: "User already registered with the same email address",
      });
    }
    const checkUserName = await User.findOne({ userName: userName });
    if (checkUserName) {
      return res.json({
        success: false,
        message: "This username already taken",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Registration successful", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "some error occured" });
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist)
      return res.json({ success: false, message: "User doesn't exists" });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!checkPasswordMatch)
      return res.json({ success: false, message: "Password incorrect" });

    const token = jwt.sign(
      {
        id: userExist._id,
        role: userExist.role,
        email: userExist.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: userExist.email,
        role: userExist.role,
        id: userExist._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "some error occured" });
  }
};

// logout

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};

// authmiddleware

export const authmiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized User" });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: "Unauthorized User" });
  }
};
