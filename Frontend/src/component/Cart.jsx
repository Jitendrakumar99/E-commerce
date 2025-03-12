import React, { useState, useEffect, useContext } from "react";
import { FaArrowDown, FaStar, FaPercent } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import "./Product.css";
import "./Cart.css";
import { AppContext } from "../context/Context";
import toast from "react-hot-toast";
import CheckoutForm from "./Checkout";
import axios from 'axios'

function Cart({item}) {
  const {setCartItems,cartItems,TotalPrice,setTotalPrice,TotalDisPrice,Url,setTotalDisPrice,Quantity,setQuantity,removeFromCart}=useContext(AppContext)
  const [value, setValue] = useState(item.quantity);
  console.log(item);

  async function addCart(quantity) {
    const data = {
      cartId: item.cartId,
      quantity: quantity, 
    };
  
    try {
      const res = await axios.post(`${Url}updataCartdata`, data);
      console.log("Cart updated:", res.data);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  }
  
  const QuantityDecHandler = (product) => {
    if (value > 1) {
      const total = product.price;
      const discount = product.discountPercentage;
  
      setTotalDisPrice((prev) => prev - (total * discount) / 100);
      setTotalPrice((prev) => prev - total);
  
      const newValue = value - 1;
      setValue(newValue);
  
      // Update cartItems in context
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === product._id ? { ...cartItem, quantity: newValue } : cartItem
      );
      setCartItems(updatedCart);
  
      addCart(newValue);
    }
  };
  
  const QuantityIncHandler = (product) => {
    if (value < 10) {
      const total = product.price;
      const discount = product.discountPercentage;
  
      setTotalDisPrice((prev) => prev + (total * discount) / 100);
      setTotalPrice((prev) => prev + total);
  
      const newValue = value + 1;
      setValue(newValue);
  
      // Update cartItems in context
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === product._id ? { ...cartItem, quantity: newValue } : cartItem
      );
      setCartItems(updatedCart);
  
      addCart(newValue);
    }
  };
  
  
 
  function price(v) {
    return v.toFixed(2);
  }
  const remove = async (id) => {
    // try {
      // Update UI immediately
      // const updatedCartItems = cartItems.filter((chosen) => chosen._id !== id);
      // setCartItems(updatedCartItems);
      const token = localStorage.getItem('token');
        const data = {
          productId: id,
        };
        await removeFromCart(data,token)
        toast.success('Item removed from cart');
    // }
    //    catch (err) {
    //   console.error('Error removing item:', err);
    //   // Revert UI change on error
    //   setCartItems(cartItems);
    //   toast.error('Failed to remove item');
    // }
  };

  function dis(v, v1) {
    const p = (v1 - (v1 * v) / 100).toFixed(2);
    return p;
  }
 
  

   return (
    <div className="card w-full bg-white h-fit rounded-lg shadow-sm mb-4">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="p-3">
          {/* Product Image and Basic Info */}
          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3">
            {/* Image */}
            <div className="w-[120px] h-fit flex-shrink-0">
              <img 
                className="w-full h-full object-contain" 
                src={item.images[0] || item.images[1]} 
                alt={item.title}
              />
            
             {/* Quantity Controls */}
          <div className="flex items-center justify-center gap-3 my-3 py-2 border-y">
            <button 
              onClick={() => QuantityDecHandler(item)} 
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-10 text-center text-base">{item.quantity}</span>
            <button 
              onClick={() => QuantityIncHandler(item)}
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
          </div>
            {/* Basic Info */}
            <div className="flex-1 min-w-0 w-full">
              <h3 className="text-base font-medium line-clamp-2 mb-2">{item.title}</h3>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{item.rating}</span>
                  <FaStar className="text-yellow-400" fontSize={"14px"} />
                </div>
                <span className="text-sm text-center  text-red-500">({item.stock} Left)</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <del className="text-sm text-gray-500 flex items-center">
                  <FaArrowDown className="text-blue-600 mr-1" />${price(item.price)}
                </del>
                <span className="text-base font-semibold">${dis(item.discountPercentage, item.price)}</span>
                <span className="text-sm text-green-600 flex items-center">
                  {item.discountPercentage}<FaPercent fontSize={"12px"} /> Off
                </span>
              </div>
          
          

          {/* Shipping Info */}
          <div className=" space-y-1 w-full">
            <div className="text-sm text-gray-600 line-clamp-1">{item.shippingInformation}</div>
            <div className="text-sm text-gray-600 line-clamp-1">{item.returnPolicy}</div>
            <div className="text-sm text-gray-600">Delivery in 2 days | Free</div>
          </div>

         
          
         

          {/* Action Buttons */}
          <div className=" gap-6 flex ">
            <button 
              onClick={() => remove(item._id)} 
              className="text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              SAVE FOR LATER
            </button>
            <button 
              onClick={() => remove(item._id)} 
              className="text-sm text-gray-700 hover:text-red-600 font-medium"
            >
              REMOVE
            </button>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Section - Image and Quantity */}
        <div className="w-[20%] flex flex-col items-center gap-4">
          <div className="w-full">
            <img 
              className="w-full h-auto max-h-[200px] object-contain" 
              src={item.images[0] || item.images[1]} 
              alt={item.title}
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => QuantityDecHandler(item)} 
              className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-10 text-center">{item.quantity}</span>
            <button 
              onClick={() => QuantityIncHandler(item)}
              className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="flex-1 ml-6">
          <h3 className="text-lg font-medium mb-2 break-words line-clamp-2">{item.title}</h3>
          
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-1">
              <span>{item.rating}</span>
              <FaStar className="text-yellow-400" fontSize={"16px"} />
            </div>
            <span className="text-sm text-red-500">({item.stock} Left)</span>
          </div>

          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <del className="text-gray-500 flex items-center">
              <FaArrowDown className="text-blue-600 mr-1" />${price(item.price)}
            </del>
            <span className="text-lg font-semibold">${dis(item.discountPercentage, item.price)}</span>
            <span className="text-green-600 flex items-center text-sm">
              {item.discountPercentage}<FaPercent fontSize={"12px"} /> Off
            </span>
          </div>

          <div className="space-y-1.5 mb-4">
            <div className="text-sm text-gray-600 line-clamp-1">{item.shippingInformation}</div>
            <div className="text-sm text-gray-600 line-clamp-1">{item.returnPolicy}</div>
            <div className="text-sm text-gray-600">Delivery in 2 days, Fri | Free</div>
          </div>

          <div className="flex gap-4 pt-3 border-t flex-wrap">
            <button 
              onClick={() => remove(item._id)} 
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              SAVE FOR LATER
            </button>
            <button 
              onClick={() => remove(item._id)} 
              className="text-gray-700 hover:text-red-600 font-medium"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
