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
  


