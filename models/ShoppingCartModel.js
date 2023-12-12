const mongoose = require('mongoose');

// Define a schema for the shopping cart items
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product', // Reference to the product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: String,
  color: String,
});

// Define the main shopping cart schema
const shoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Reference to the user who owns the cart
    required: true,
  },
  items: [cartItemSchema], // An array of cart items
});

// Create a model for the shopping cart
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
