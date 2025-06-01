const userService = require("../services/userService");

// Local signup controller
exports.localSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.localSignup(email, password);
    res.status(201).json({
      status: true,
      message: "Account created successfully",
      token
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

// Google auth controller
exports.googleAuth = async (req, res) => {

  console.log("Google Auth Request Body:", req.body); 

  try {
    const { credential } = req.body;
    const { user, token } = await userService.googleAuth(credential);
    res.status(200).json({
      status: true,
      message: "Authentication successful",
      token
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

exports.localSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.localSignIn(email, password);

    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.json({
      status: true,
      message: "Login successful",
      user: userResponse,
      token
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

