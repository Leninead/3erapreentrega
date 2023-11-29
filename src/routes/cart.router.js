const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define your cart-related routes
router.post('/', cartController.createCart);
router.get('/:userId', cartController.getCart);
router.post('/:cartId/products', cartController.addProductToCart);
router.put('/:cartId/products/:productId', cartController.updateProductQuantity);
router.delete('/:cartId/products/:productId', cartController.removeProductFromCart);
router.delete('/:cartId', cartController.clearCart);

// Add the purchase route
router.post('/:cid/purchase', cartController.purchaseCart);

module.exports = router;
