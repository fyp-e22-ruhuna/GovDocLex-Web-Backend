const CustomerModel = require("../models/customer")


const addCustomer = async (customer) => {
    try {
        const newCustomer = new CustomerModel(customer);
        await newCustomer.save();
        return newCustomer;
    } catch (error) {
        throw new Error(`Error adding customer: ${error.message}`);
    }
};


const getCustomers = async () => {

    try {
        const customers = await CustomerModel.find();
        return customers;
    }

    catch (error) {
        throw new Error(`Error getting customers: ${error.message}`);
    }
}


module.exports={
    addCustomer,getCustomers
};
