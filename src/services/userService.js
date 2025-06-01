const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.localSignup = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    authMethod: "local",
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user: newUser, token };
};

// Handle Google signup/login
exports.googleAuth = async (credential) => {
  const {
    sub: googleId,
    email,
    name,
    picture,
    given_name,
    family_name,
  } = jwt.decode(credential);

  const user = await User.findOneAndUpdate(
    { email },
    {
      googleId,
      authMethod: "google",
      profile: {
        name,
        picture,
        givenName: given_name,
        familyName: family_name,
      },
    },
    { upsert: true, new: true }
  );

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { user, token };
};

exports.localSignIn = async (email, password) => {
  try {

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

  
    return { user, token };
  } catch (error) {
    throw error;
  }
};
