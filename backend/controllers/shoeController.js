const Shoe = require("../models/shoe");

  exports.getAllShoes = async (req, res) => {
      const allShoes = await Shoe.find();
      const shoesWithId = allShoes.map((shoe) => ({
        ...shoe._doc,
        id: shoe._id.toString(),
      }));
      res.status(200).json(req.user.role === 'brand_user' ? shoesWithId : shoesWithId.filter(s => s.brandId === req.user.brandId));
    }

  exports.createShoe = async (req, res) => {
    try {
        const { name, price, brandId, size, description, image } = req.body;
  
        if (!name || !price || !brandId || !size || !description || !image) {
          return res.status(400).json({ message: "All fields are required" });
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

  exports.editShoe = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, brandId, size, description, image } = req.body;
  
      const shoe = await Shoe.findById(id);
      if (!shoe) {
        return res.status(404).json({ message: "Shoe not found" });
      }
  
      if (
        req.user.role !== "brand_user" &&
        shoe.brandId.toString() !== req.user.brandId
      ) {
        return res.status(403).json({ message: "You are not authorized to edit this shoe" });
      }
  
      if (name !== undefined) shoe.name = name;
      if (price !== undefined) shoe.price = price;
      if (brandId !== undefined) shoe.brandId = brandId;
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
      const shoe = await Shoe.findById(id);
      if (!shoe) return res.status(404).json({ message: "Shoe not found" });
  
      if (req.user.role !== "brand_user" && shoe.brandId.toString() !== req.user.brandId)
     {
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
  
      // Allow if user is super_admin or brand_user and owns the shoe
      if (
        user.role !== 'brand_user' &&
        !(user.role === 'brand_user' && user.brandId === shoe.brandId.toString())
      ) {
        return res.status(403).json({ message: 'Not authorized to delete this shoe' });
      }
  
      await Shoe.findByIdAndDelete(shoeId);
      res.status(200).json({ message: 'Shoe deleted successfully' });
    } catch (error) {
      console.error('Error deleting shoe:', error);
      res.status(500).json({ message: 'Server error while deleting shoe' });
    }
  };
  
  