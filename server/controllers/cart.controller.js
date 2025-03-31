import User from "../models/user.model.js";

// Add products to user cart 
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await User.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Added to cart successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
}

// Update product in user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await User.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Cart updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
}

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await User.findById(userId);
        const cartData = await userData.cartData;
        res.json({ success: true, cartData });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
}

export { addToCart, updateCart, getUserCart };