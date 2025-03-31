import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formdata,
        items: orderItems[0] ? orderItems : [],
        amount: getCartAmount() + delivery_fee
      };
      
      switch (method) {
        case "cod":
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {
            headers: {
              Authorization: 'Bearer ' + token
            }            
          })
          if(response.data.success) {
            setCartItems({});
            navigate("/orders");
          }
          else {
            toast.error(response.data.message)
          }
          break;
        // case "stripe":
        //   const stripeResponse = await axios.post(backendUrl + '/api/order/stripe', orderData, {
        //     headers: {
        //       Authorization: 'Bearer ' + token
        //     }
        //   })
        //   if(stripeResponse.data.success) {
        //     const {session_url} = stripeResponse.data;
        //     window.location.replace(session_url);
        //   }
        //   else {
        //     toast.error(stripeResponse.data.message)
        //   }
        //   break;

        default:
          orderData.paymentMethod = "COD";
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error placing order");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5  sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="w-full flex flex-col gap-4 sm:max-w-[480px]">
        <div className="text-sm sm:text-2xl my-3">
          <Title text1={"YOUR"} text2={"ORDER"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={formdata.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={formdata.lastName}
            placeholder="Last Name"
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={formdata.email}
          placeholder="Email"
          className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
        />
        <input
          required
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={formdata.street}
          placeholder="Street Address"
          className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={formdata.city}
            placeholder="City"
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          />
          <input
            required
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={formdata.state}
            placeholder="State"
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="number"
            name="zipcode"
            onChange={onChangeHandler}
            value={formdata.zipcode}
            placeholder="Zipcode"
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          />
          <input
            required
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={formdata.country}
            placeholder="Country"
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          />
        </div>
        <input
          required
          type="number"
          name="phone"
          onChange={onChangeHandler}
          value={formdata.phone}
          placeholder="Phone"
          className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method Selection  */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white text-sm px-16 py-3"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
