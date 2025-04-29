const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shoe name is required"],
  },
  price: {
    type: Number,
    required: [true, "Shoe price is required"],
  },
  brandId: {
    type: String,
    required: [true, "Brand is required"],
  },
  size: {
    type: Number,
    required: [true, "Shoe size is required"],
  },
  image: {
    type: String
  },
}); 

module.exports = mongoose.model('Shoe', shoeSchema);
