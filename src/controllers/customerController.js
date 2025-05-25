const customerService = require("../services/customerService");

const addCustomer = async (req, res) => {
  try {
    const customer = await customerService.addCustomer(req.body);
    res
      .status(201)
      .json({ message: "Customer added successfully", data: customer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customer = await customerService.getCustomers();
    res
      .status(200)
      .json({ message: "Customers fetched successfully", data: customer });
  } catch (error) {
    res.status(500).json({ message: `Error getting users: ${error.message}` });
  }
};

module.exports = {
  addCustomer,
  getCustomers,
};
