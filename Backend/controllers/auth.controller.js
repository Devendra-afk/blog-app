import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    
    // Validate required fields
    if (
      !username ||
      username === "" ||
      !email ||
      !email === "" ||
      !password ||
      password === ""
    ) {
      return next(errorHandler(400, "All Fields are required"));
    }

    // Check if email already exists
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Check if username already exists
    existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    
    // Remove password from response
    const { password: pass, ...rest } = newUser._doc;

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      rest,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    if (!password || password === "") {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findOne({
      $or: [
        email ? {
          email: { $regex: email, $options: "i" },
        } : null,
        username ? {
          username: { $regex: username, $options: "i" },
        } : null,
      ].filter(Boolean),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const validateUser = bcryptjs.compareSync(password, user.password);
    if (!validateUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const { password: pass, ...rest } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        rest,
        message: "Login Successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const google = async (req, res) => {
  try {
    const { name, email, googlePhotoUrl } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          rest,
          success: true,
          message: "Login Successfully",
        });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      
      const newUser = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      
      return res
        .status(201)
        .cookie("access_token", token, { httpOnly: true })
        .json({
          success: true,
          rest,
          message: "User Created Successfully",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { signUp, signIn, google };