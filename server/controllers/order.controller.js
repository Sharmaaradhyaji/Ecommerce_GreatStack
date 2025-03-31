import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";

// const currency = 'inr';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const deliveryCharges = 10;

// placing orders using COD 
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const order = new Order({
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        });
        await order.save();

        await User.findByIdAndUpdate(userId, { cartData: {} } );

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order", error: error.message });
    }
};

// placing order using Stripe 
// const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         const {origin} = req.headers;

//         const order = new Order({
//             userId,
//             items,
//             amount,
//             address,
//             status: "Order Placed",
//             paymentMethod: "Stripe",
//             payment: false,
//             date: Date.now(),
//         })

//         await order.save();

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price * 100,
//             },
//             quantity: item.quantity,
//         }));

//         line_items.push({
//             price_data: {
//                 currency: currency,
//                 product_data: {
//                     name: "Delivery Fee",
//                 },
//                 unit_amount: deliveryCharges * 100,
//             },
//             quantity: 1,
//         });

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?status=true&orderId=${order._id}`,
//             cancel_url: `${origin}/verify?status=false&orderId=${order._id}`,
//             line_items,
//             mode: "payment",
//         });

//         res.json({ success: true, url: session.url });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Error placing order", error: error.message });
//     }
// };
const placeOrderStripe = async (req, res) => {};

// placing order using Razorpay
const placeOrderRazorpay = async (req, res) => {};

// All orders data for admin panel 
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        res.json({success: true, orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};

// user order data for frontend 
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        
        const orders = await Order.find({userId})
        
        res.json({success: true, orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};

// update order status for admin panel
const updateOrderStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body

        await Order.findByIdAndUpdate(orderId, {status})

        res.json({success: true, message: "Order status updated successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
    }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus };