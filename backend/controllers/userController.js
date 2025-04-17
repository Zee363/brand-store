const User = require("../models/user");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password field from the response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

const deleteUser = async (req, res) => {
    try {
       await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};

const updateUserBrand = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { brand: req.body.brand },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
};

module.exports = { getAllUsers, deleteUser, updateUserBrand };