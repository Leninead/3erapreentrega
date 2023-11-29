const CartDAO = require('../dao/cartDAO');
const CartDTO = require('../dto/cartDTO');

class CartRepository {
  async createCart(cartData) {
    const cart = await CartDAO.createCart(cartData);
    return new CartDTO(cart.user, cart.products);
  }

  async getCartById(cartId) {
    const cart = await CartDAO.getCartById(cartId);
    return new CartDTO(cart.user, cart.products);
  }

  async clearCartItems(cartId) {
    return await CartDAO.clearCartItems(cartId);
  }

  // Add other methods as needed, using DAOs and returning DTOs
}

const cartRepository = new CartRepository();
module.exports = cartRepository;
