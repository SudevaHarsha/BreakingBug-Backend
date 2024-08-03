const bcrypt = require('bcrypt');
const Seller = require('../models/sellerSchema.js');
const { createNewToken } = require('../utils/token.js');

const sellerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const seller = new Seller({
            ...req.body,
            password: hashedPass    // bcrypt.hash -> hashedPass
        });

        const existingSellerByEmail = await Seller.findOne({ email: req.body.email });
        const existingShop = await Seller.findOne({ shopName: req.body.shopName });

        if (existingSellerByEmail) {
            res.status(404).send({ message: 'Email already exists' });        // status added
        }
        else if (existingShop) {
            res.status(404).send({ message: 'Shop name already exists' });   // status added
        }
        else {
            let result = await seller.save();
            result.password = undefined;

            const token = createNewToken(result._id)

            result = {
                ...result._doc,
                token: token
            };

            res.status(201).send(result);   // status added
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const sellerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let seller = await Seller.findOne({ email: req.body.email });
        if (seller) {
            const validated = await bcrypt.compare(req.body.password, seller.password);
            if (validated) {
                seller.password = undefined;

                const token = createNewToken(seller._id)

                seller = {
                    ...seller._doc,
                    token: token      // token:tokens -> token:tokrn
                };

                res.send(seller);
            } else {
                res.status(401).send({ message: "Invalid password" });   // status added
            }
        } else {
            res.status(404).send({ message: "User not found" });   // status found
        }
    } else {
        res.status(400).send({ message: "Email and password are required" });   // status added
    }
};

module.exports = { sellerRegister, sellerLogIn };
