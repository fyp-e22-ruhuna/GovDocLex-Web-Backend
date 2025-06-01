const userService = require("../services/userService");
const { validateRequest } = require("../middleware/validationMiddleware");
const { userSchema } = require("../validation/userValidation");

const login = async (req, res) => {
  try {
    const tokenData = await userService.login(req.body);
    res.status(200).json({ message: "Login successful", data: tokenData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: "Registration successful", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const pinmessage = async (req, res) => {
  try {
    userService.pinMessage(); // call the service
    res.status(200).json({ message: "Pin message called" });
  } catch (error) {
    console.error("Error in pinmessage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  login,
  register: [validateRequest(userSchema), register],
  pinmessage,
};
