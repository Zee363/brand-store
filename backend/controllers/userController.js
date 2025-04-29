const User = require("../models/user");

exports.deleteUser = async (req, res) => {
    try {
       await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};

exports.updateUserBrand = async (req, res) => {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: "Shoe not found" });
  
    // Only super_admin or owner of the brand can update
    if (req.user.role !== "super_admin" && shoe.brandId.toString() !== req.user.brandId) {
      return res.status(403).json({ message: "You are not authorized to update this shoe" });
    }
  
    Object.assign(shoe, req.body);
    await shoe.save();
    res.json(shoe);
  };


module.exports = { getAllUsers, deleteUser, updateUserBrand };