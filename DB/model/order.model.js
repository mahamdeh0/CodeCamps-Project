const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    shippingDetails: {
      type: Object
    }
  }, { timestamps: true });
  
  const orderModel = mongoose.model('order', orderSchema);
  module.exports = { orderModel};
  