const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    image :{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Image'
  },
  }, {timestamps: true});
  
  const productModel = mongoose.model('product', productSchema);
  module.exports = { productModel};
