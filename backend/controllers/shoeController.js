const Shoe = require("../models/shoe");

  exports.getAllBrands = async (req, res) => {
    try {
      const brands = await Shoe.find();
      res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching brands" });
  }
};
 
  exports.createShoe = async (req, res) => {
      console.log("User info:", req.user); 
  
      try {
          let { name, price, size, description, image, brand } = req.body;
  
      if (req.user.role === 'super_admin') {
        if (!brand) {
          return res.status(400).json({ message: 'Brand is required for super_admin' });
        }
      } else if (req.user.role === 'brand_user') {
        brand = req.user.brand; 
      }
          const newShoe = await Shoe.create({
            name,
            price,
            brand,
            size,
            description,
            image,
          });
    
          res.status(201).json(newShoe);
        } catch (error) {
          res.status(500).json({ message: "Error creating shoe" });
        }
    };  

  exports.editShoe = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, size, description, image } = req.body;
  
      const shoe = await Shoe.findById(id);
      if (!shoe) {
        return res.status(404).json({ message: "Shoe not found" });
      }
  
      if (
        req.user.role === "brand_user" && shoe.brand.toString() !== req.user.brand ) {
        return res.status(403).json({ message: "You are not authorized to edit this shoe" });
      }
  
      if (name !== undefined) shoe.name = name;
      if (price !== undefined) shoe.price = price;
      if (size !== undefined) shoe.size = size;
      if (description !== undefined) shoe.description = description;
      if (image !== undefined) shoe.image = image;
  

      const updatedShoe = await shoe.save();
  
      res.status(200).json(updatedShoe);
    } catch (error) {
      res.status(500).json({ message: "Error editing shoe" });
    }
  };
  
  exports.updateShoe = async (req, res) => {
    const { id } = req.params;

    try {
      const shoe = await Shoe.findById(req.params.id);
      if (!shoe) return res.status(404).json({ message: "Shoe not found" });
  
      if ( req.user.role === "brand_user" && shoe.brand.toString() !== req.user.brand ) {
        return res.status(403).json({ message: "You are not authorized to update this shoe" });
      }
  
      const updatedShoe = await Shoe.findByIdAndUpdate(id, req.body, { new: true });

      res.status(200).json(updatedShoe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  

  exports.deleteShoe = async (req, res) => {
    try {
      const user = req.user;
      const shoeId = req.params.id;
  
      const shoe = await Shoe.findById(shoeId);
      if (!shoe) {
        return res.status(404).json({ message: 'Shoe not found' });
      }
  
      if ( user.role === 'brand_user' && shoe.brand.toString() !== user.brand ) {
        return res.status(403).json({ message: 'Not authorized to delete this shoe' });
      }
  
      await Shoe.findByIdAndDelete(shoeId);
      res.status(200).json({ message: 'Shoe deleted successfully' });
    } catch (error) {
      console.error('Error deleting shoe:', error);
      res.status(500).json({ message: 'Server error while deleting shoe' });
    }
  };
  