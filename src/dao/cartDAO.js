// cartDAO.js
const Cart = require('../models/cart.model');

class CartDAO {
  async createCart(user) {
    try {
      const cart = new Cart({ user, products: [] });
      return await cart.save();
    } catch (error) {
      throw new Error('Failed to create a new cart');
    }
  }

  async findCartByUser(userId) {
    try {
      return await Cart.findOne({ user: userId });
    } catch (error) {
      throw new Error('Failed to find the user\'s cart');
    }
  }

  async updateCartProducts(cartId, products) {
    try {
        return await Cart.findByIdAndUpdate(cartId, { products }, { new: true });
    } catch (error) {
        throw new Error(`Failed to update the cart's products: ${error.message}`);
    }
}

async getAllCarts() {
    try {
        return await Cart.find();
    } catch (error) {
        throw new Error(`Failed to get all carts: ${error.message}`);
    }
}
}

// Create an instance of the CartDAO class
const cartDAO = new CartDAO();

// Export the instance of the CartDAO class
module.exports = cartDAO;
