const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { JWT_SECRET } = require("../../config/config");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateUsername = (email) => {
  const baseUsername = email.split("@")[0];
  const uniqueSuffix = crypto.randomBytes(3).toString("hex");
  return `${baseUsername}_${uniqueSuffix}`;
};

const register = async (userData) => {
  try {
    const {
      email,
      name,
      role,
      phoneNumber,
      position,
      department,
      employeeId,
      gender,
    } = userData;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { employeeId }],
    });
    if (existingUser) {
      throw new Error("Email or Employee ID already exists");
    }

    const username = generateUsername(email);
    const password = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      name,
      role,
      phoneNumber,
      employeeId,
      isPasswordChanged: role === "admin" ? true : false,
    });

    await newUser.save();

    await sendPasswordEmail(email, username, password);

    return newUser;
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

const login = async (loginData) => {
  try {
    const { username, password } = loginData;
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

    return { token, forcePasswordChange: !user.isPasswordChanged };
  } catch (error) {
    throw new Error(`Error logging in: ${error.message}`);
  }
};

const sendPasswordEmail = async (email, username, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Password",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Account Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f9;
                    color: #333;
                }
                .container {
                    padding: 20px;
                }
                .header {
                    background-color: #2684FF;
                    color: #ffffff;
                    padding: 10px;
                    text-align: center;
                }
                .content {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Your Account Password</h1>
                </div>
                <div class="content">
                    <p>Hello User,</p>
                    <p><strong>Details:</strong></p>
                    <ul>
                        <li><strong>User Name:</strong> ${username}</li>
                        <li><strong>Password:</strong> ${password}</li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
        `,
    };

    console.log("mailOptions", mailOptions);

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending password email: ${error.message}`);
  }
};

module.exports = {
  register,
  login,
};
