const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Customer"
    },
    cartDetails: [{
        productName: {
            type: String
        },
        price: {
            mrp: {
                type: Number // String -> Number
            },
            cost: {
                type: Number
            },
            discountPercent: {
                type: Number
            }
        },
        subcategory: {
            type: String
        },
        productImage: {
            type: String
        },
        category: {
            type: String
        },
        description: {
            type: String
        },
        tagline: {
            type: String
        },
        quantity: {
            type: Number
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seller'  // SELLER -> seller
        },
    }],
    shippingData: {
        address: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        state: {
            type: String,
            default: '',
        },
        country: {
            type: String, //Number -> String
            default: '',
        },
        pinCode: {
            type: Number,
            default: 0,
        },
        phoneNo: {
            type: Number,
            default: 0,
        },
    }
});

module.exports = mongoose.model("customer", customerSchema)