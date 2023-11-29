const Product = require('../models/product.model');
const User = require('../models/user.model');

class ProductRepository {
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addToCart(userId, productId, quantity) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const product = await Product.findById(productId);

      if (!product) {
        throw new Error('Product not found');
      }

      const cartProductIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (cartProductIndex >= 0) {
        user.cart[cartProductIndex].quantity += quantity;
      } else {
        user.cart.push({
          productId,
          quantity,
        });
      }

      await user.save();

      return user.cart;
    } catch (error) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  }

  async updateCartProductId(userId, productId, newQuantity) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const cartProductIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (cartProductIndex < 0) {
        throw new Error('Product not found in cart');
      }

      user.cart[cartProductIndex].quantity = newQuantity;

      await user.save();

      return user.cart;
    } catch (error) {
      throw new Error(`Error updating cart product quantity: ${error.message}`);
    }
  }

  async updateQuantityProductId(userId, productId, newQuantity) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const cartProductIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (cartProductIndex < 0) {
        throw new Error('Product not found in cart');
      }

      user.cart[cartProductIndex].quantity = newQuantity;

      await user.save();

      return user.cart;
    } catch (error) {
      throw new Error(`Error updating cart product quantity: ${error.message}`);
    }
  }

  async getCartContents(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user.cart;
    } catch (error) {
      throw new Error(`Error retrieving cart contents: ${error.message}`);
    }
  }

  async removeFromCartProductId(userId, productId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const productIndex = user.cart.findIndex(
        (product) => product.productId.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error('Product not found in the cart');
      }

      user.cart.splice(productIndex, 1);

      await user.save();

      return user.cart;
    } catch (error) {
      throw new Error(`Error removing product from cart: ${error.message}`);
    }
  }
}

module.exports = ProductRepository;
