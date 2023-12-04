import UserModel from "../models/User.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
} from "../utils/validator/regEx.mjs";

export const singupUser = async (req, res) => {
  try {
    let { email, name, password, username } = req.body;

    if (!email || !name || !password || !username) {
      return res
        .status(404)
        .json({ message: "please enter required field", status: false });
    }
    if (!emailRegex(email)) {
      return res
        .status(404)
        .json({ message: "please enter valid email", status: false });
    }
    // Convert email to lowercase
    email = email.toLowerCase();
    if (!nameRegex(name)) {
      return res
        .status(404)
        .json({ message: "please enter valid name", status: false });
    }

    if (passwordRegex(password)) {
      return res
        .status(404)
        .json({ message: "please enter valid password", status: false });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // returning the hashed password;

    const cerateUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    if (cerateUser) {
      return res
        .status(201)
        .json({ message: "sign up successfully", status: true });
    } else {
      return res.status(404).json({ message: "sign up failed", status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const { JWT_SECRET, JWT_EXPIRY } = process.env;

    // Trim email and password----------------------------------------------------------------
    email = email.trim();
    password = password.trim();

    // Email validation----------------------------------------------------------------
    if (!email) {
      return res
        .status(404)
        .json({ status: false, message: "Please enter the email" });
    }
    if (!emailRegex(email)) {
      return res
        .status(404)
        .json({ status: false, message: "Please enter a valid email" });
    }

    // Convert email to lowercase---=--------------------------------------------------
    email = email.toLowerCase();

    // Password validation------------------------------------------------------------------
    if (!password) {
      return res
        .status(404)
        .json({ status: false, message: "Please enter the password" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Account not found! Please register first.",
      });
    }

    bcrypt.compare(password, user.password, function (err, passwordMatch) {
      if (err || !passwordMatch) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      res.status(200).json({
        status: true,
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
          message: "Login Successfull",
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "An error occurred" });
  }
};
