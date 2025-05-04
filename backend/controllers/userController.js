const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "super_admin") {
          return res.status(403).json({ message: "Access denied. Super admin only." });
        }
    
        const users = await User.find().select("-password");
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Server error while fetching users" });
      }
    };

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error while deleting user." });
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
