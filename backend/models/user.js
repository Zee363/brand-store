const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
   brand: {
        type: [String],
        enum: ['Nike', 'Adidas', 'Puma', 'Reebok'],
    },
    role: {
        type: String,
        enum: ['brand_user', 'super_admin', 'user']
    }
});

module.exports = mongoose.model("User", userSchema);