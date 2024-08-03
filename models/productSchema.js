const mongoose = require("mongoose");

const productSchema =  mongoose.Schema(
    {
        productName: {
            type: String
        },
        price: {
            mrp: {
                type: Number
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
            type: Number,  // deault:45 is removed
        },
        reviews: [
            {
                rating: {
                    type: Number,
                },
                comment: {
                    type: String,
                },
                reviewer: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "customer",  //changed from CUSTOMER -> customer
                },
                date: {
                    type: Date,
                    default: Date.now,  // Date is changed from Text -> Date.now
                },
            },
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seller'
        },
    }, { timestamps: false});

module.exports = mongoose.model("product", productSchema)  // mongoode -> model