const Shoe = require("../models/shoe");

exports.getDashboardData = async (req, res) => {
    console.log("User from token:", req.user);
    
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }


    const { role, brand } = req.user; // Extract role and brand from the token payload
    try { 
        if (role === "super_admin") {
            const allShoes = await Shoe.find();
            res.status(200).json(allShoes);
            console.log("All shoes:", allShoes);
          } else if (role === "brand_user") {
            const brandShoes = await Shoe.find({ brand });
            res.status(200).json(brandShoes);
          } else {
            res.status(403).json({ message: "Unauthorized role" });
          }
        } catch (error) {
          console.error("Dashboard Error:", error);
          res.status(500).json({ message: "Internal server error" });
        }
    };

    exports.createShoe = async (req, res) => {
        try {
          const { name, price, size, description, image, brandId } = req.body;
          const { role } = req.user;

          // Allow only brand_user role to create shoes
          if (req.user.role !== "brand_user") {
            return res.status(403).json({ message: "Unauthorized: Only brand users can create shoes" });
          }
      
          // Validate required fields
          if (!name || !price || !size || !brandId || !description || !image) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
          // Create shoe with brand from user info
          const newShoe = await Shoe.create({
            name,
            price,
            size,
            description,
            image,
            brandId,
          });
      
          res.status(201).json(newShoe);
        } catch (error) {
          console.error("Error creating shoe:", error);
          res.status(500).json({ message: "Error creating shoe" });
        }
      };
      