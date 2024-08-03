const bcrypt = require('bcrypt');
const Customer = require('../models/customerSchema.js');
const {createNewToken} = require('../utils/token.js');     // import corrected

const customerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const shippingData = req.body.shippingData || {};

        const customer = new Customer({
            ...req.body,
            password: hashedPass,
            shippingData: shippingData // Ensure shippingData is included
        });

        const existingcustomerByEmail = await Customer.findOne({ email: req.body.email });

        if (existingcustomerByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await customer.save();
            result.password = undefined;
            
            const token = createNewToken(result._id);

            result = {
                ...result._doc,
                token: token
            };

            res.status(201).json(result);  // send(result) -> send(201).json(reult)
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const customerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let customer = await Customer.findOne({ email: req.body.email });
        if (customer) {       // !customer -> customer
            const validated = await bcrypt.compare(req.body.password, customer.password);
            if (validated) {  // !validated -> validated
                customer.password = undefined;

                const token = createNewToken(customer._id)

                customer = {
                    ...customer._doc,
                    token: token
                };

                res.send(customer);
            } else {
                res.status(401).send({ message: "Invalid password" });          // status added
            }
        } else {
            res.status(404).send({ message: "User not found" });                // status added
        }
    } else {
        res.status(400).send({ message: "Email and password are required" });   // status added
    }
};

const getCartDetail = async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id)  // findBy -> findById
        if (customer) {
            res.send(customer.cartDetails);   // res.get -> res.send
        }
        else {
            res.status(404).send({ message: "No customer found" });  // status added
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const cartUpdate = async (req, res) => {
    try {

        let customer = await Customer.findByIdAndUpdate(req.params.id,{ $set: req.body },
            { new: false }) //added $set:req.body

        return res.send(customer);  // customer.cartDetails -> customer

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate,
};
