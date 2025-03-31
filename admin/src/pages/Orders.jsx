import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    // Only send update request if status has actually changed
    if (newStatus === order.status) {
      return; // Don't send request if status is unchanged
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: newStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.success) {
        await fetchAllOrders(); // Refresh orders after status update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="Parcel icon" />
            <div>
              {/* Render items */}
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => {
                  return (
                    <p className="py-0.5" key={index}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                      {index < order.items.length - 1 && ","}
                    </p>
                  );
                })
              ) : (
                <p>No items in this order.</p>
              )}
            </div>
            {/* Render address */}
            <p className="mt-3 mb-2 font-medium">
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <div>
              <p>{order.address.street + ", "}</p>
              <p>
                {order.address.city +
                  ", " +
                  order.address.state +
                  ", " +
                  order.address.pincode}
              </p>
            </div>
            <p>{order.address.phone}</p>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Paid" : "Not Paid"}</p>
              <p>Date: {new Date(order.date).toDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount.toFixed(2)}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Order Shipped">Order Shipped</option>
              <option value="Order Delivered">Order Delivered</option>
              <option value="Out for delivery">Out for delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
