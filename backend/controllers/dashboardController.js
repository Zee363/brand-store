const Shoe = require("../models/shoe");

exports.getDashboardData = async (req, res) => {
    console.log("User from token:", req.user);
    
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }


    const { role, brandId } = req.user;
    try { 
        if (role === "super_admin") {
            const allShoes = await Shoe.find();
            res.status(200).json(allShoes);
            console.log("All shoes:", allShoes);
          } else if (role === "brand_user") {
            const brandShoes = await Shoe.find({ brandId });
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
    console.log("User info:", req.user); 

    try {
        const { name, price, size, description, image } = req.body;
        let brandId;

    if (req.user.role === 'super_admin') {
      brandId = req.body.brandId;
      if (!brandId) {
        return res.status(400).json({ message: 'Brand ID is required for super_admin' });
      }
    } else if (req.user.role === 'brand_user') {
      brandId = req.user.brandId;
    }
        const newShoe = await Shoe.create({
          name,
          price,
          brandId,
          size,
          description,
          image,
        });
  
        res.status(201).json(newShoe);
      } catch (error) {
        res.status(500).json({ message: "Error creating shoe" });
      }
  };  

 