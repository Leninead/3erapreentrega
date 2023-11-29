const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');
const CartRepository = require('../repository/cartRepository'); // Updated import statement
const UserService = require('../services/userService');
const cartUtils = require('../utils/cartUtils');

async function createCart(req, res) {
    try {
        // Implementation for creating a new cart
        const userId = req.user._id; // Assuming user information is available through authentication

        // Use dependency injection for services
        const user = await cartUtils.getUserById(userId, UserService);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new cart and save it
        const newCart = await cartService.createCart({ user: userId });
        res.json({ message: 'Cart created successfully', cart: newCart });
    } catch (error) {
        // Log specific error message for debugging
        console.error(`Error in createCart: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function purchaseCart(req, res) {
    try {
        const cartId = req.params.cid;
        const userId = req.user._id; // Assuming user information is available through authentication

        // Use dependency injection for services
        const cart = await cartService.getCartById(cartId, CartRepository);
        const user = await cartUtils.getUserById(userId, UserService);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Calculate the total cost of the items in the cart using cartUtils
        const totalCost = cartUtils.calculateTotalCost(cart.products);

        if (user.balance < totalCost) {
            return res.status(403).json({ message: 'Insufficient funds' });
        }

        // Create and save tickets
        const tickets = cartUtils.createTicketsFromCart(cart.products);

        // Update product stock
        cartUtils.updateProductStock(cart.products);

        // Update user balance
        cartUtils.updateUserBalance(userId, totalCost);

        // Clear the cart items
        cartUtils.clearCartItems(cartId);

        // Respond with a success message
        res.json({ message: 'Purchase successful', tickets });
    } catch (error) {
        // Log specific error message for debugging
        console.error(`Error in purchaseCart: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCart(req, res) {
    try {
        const userId = req.params.userId;
        const cart = await cartService.getCartByUserId(userId, CartRepository);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json({ cart });
    } catch (error) {
        console.error(`Error in getCart: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function addProductToCart(req, res) {
    try {
        const cartId = req.params.cartId;
        const { productId, quantity } = req.body;

        const cart = await cartService.addProductToCart(cartId, productId, quantity, CartRepository);

        res.json({ cart });
    } catch (error) {
        console.error(`Error in addProductToCart: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateProductQuantity(req, res) {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const { quantity } = req.body;

        const cart = await cartService.updateProductQuantity(cartId, productId, quantity, CartRepository);

        res.json({ cart });
    } catch (error) {
        console.error(`Error in updateProductQuantity: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function removeProductFromCart(req, res) {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;

        const cart = await cartService.removeProductFromCart(cartId, productId, CartRepository);

        res.json({ cart });
    } catch (error) {
        console.error(`Error in removeProductFromCart: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function clearCart(req, res) {
    try {
        const cartId = req.params.cartId;

        await cartService.clearCart(cartId, CartRepository);

        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(`Error in clearCart: ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// ... (other functions remain unchanged)

module.exports = {
    createCart,
    getCart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    clearCart,
    purchaseCart,
};
