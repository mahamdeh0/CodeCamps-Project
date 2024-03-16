const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher',
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

const cartModel = mongoose.model('cart', cartSchema);
module.exports = { cartModel};
