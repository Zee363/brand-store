const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        enum: ['Nike', 'Adidas', 'Puma', 'Reebok'],
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Shoe", shoeSchema);