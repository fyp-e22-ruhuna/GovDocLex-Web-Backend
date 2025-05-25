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

module.exports = {
  login,
  register: [validateRequest(userSchema), register],
};
