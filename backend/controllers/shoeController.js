const Shoe = require("../models/shoe");

  exports.getAllShoes = async (req, res) => {
    try {
      const filteredShoes =
       req.user.role === "super_admin"
          ? shoes // Super admin can see all shoes
            : shoes.filter((shoe) => shoe.brand === req.user.brand); // Filter by brand for others
   
            res.status(200).json(filteredShoes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shoes" });
    }
  };
  

  exports.createShoe = async (req, res) => {
    try {
        const { name, price, brand, size, color } = req.body;
  
        if (!name || !price || !brand || !size || !color) {
          return res.status(400).json({ message: "All fields are required" });
        }
  
        const newShoe = await Shoe.create({
          name,
          price,
          brand,
          size,
          color,
        });
  
        res.status(201).json(newShoe);
      } catch (error) {
        res.status(500).json({ message: "Error creating shoe" });
      }
  }  
  
  exports.updateShoe = async (req, res) => {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: "Shoe not found" });
    if( req.user.role !== "super_admin" && shoe.brand !== req.user.brand) {
        return res.status(403).json({ message: "You are not authorized to update this shoe" });
    }
    Object.assign(shoe, req.body);
    await shoe.save();
    res.json(shoe);
  };

    exports.deleteShoe = async (req, res) => {
        const shoe = await Shoe.findById(req.params.id);
        if (!shoe) return res.status(404).json({ message: "Shoe not found" });
        if( req.user.role !== "super_admin" && shoe.brand !== req.user.brand) {
            return res.status(403).json({ message: "You are not authorized to delete this shoe" });
        }
        await shoe.remove();
        res.json({ message: "Shoe removed" });
    };