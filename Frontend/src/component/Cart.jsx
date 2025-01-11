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
  const {setCartItems,cartItems,TotalPrice,setTotalPrice,TotalDisPrice,setTotalDisPrice,Quantity,setQuantity}=useContext(AppContext)
  const [value, setValue] = useState(1);

  async function addCart(quantity) {
    const data = {
      cartId: item.cartId,
      quantity: quantity, // Use the updated quantity here
    };
  
    try {
      const res = await axios.post("http://localhost:9000/updataCartdata", data);
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
      addCart(newValue); // Pass the updated value
    }
  };
  
 
  function price(v) {
    return v.toFixed(2);
  }
  const removeFromCart = (id) => {
    // console.log(items);
    console.log(id);
    if(cartItems){
      const updatedCartItems = cartItems.filter((chosen) => chosen._id !== id);
      setCartItems(updatedCartItems);
    }
    axios.post("http://localhost:9000/removecartdata", 
      { id: id.toString() },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        console.log('Response:', res);
      })
      .catch(err => {
        console.log('Error:', err);
      });
    }

  function dis(v, v1) {
    const p = (v1 - (v1 * v) / 100).toFixed(2);
    return p;
  }
 
  

   return (
          <div  className="card w-full h-[280px] flex flex-row  rounded-none p-5">
          <div className="cardleft h-full w-[20%] flex-col flex justify-start bg-[#FFFFFF] mr-5">
            <div className="w-full h-[180px] aspect-auto">
            <img className="w-full h-full" src={item.images[0] || item.images[1]} alt="" />
            </div>
            <div className="flex items-center justify-evenly m-5 g-5 w-full ">
              <div onClick={()=>QuantityDecHandler(item)} className="minus w-[40px] h-[40px] rounded-full border flex justify-center items-center text-xl border-gray-600 cursor-pointer">
                    -
              </div>
              <div className="Quantity minus w-[80px] h-[40px] border flex justify-center items-center text-xl border-gray-600 ">
                 {item.quantity}
              </div>
              <div onClick={()=>QuantityIncHandler(item)}className="plus minus w-[40px] h-[40px] rounded-full border flex justify-center items-center text-xl border-gray-600 cursor-pointer">
                  +
              </div>
            </div>
          </div>
          <div className="cardright">
            <div className="title">{item.title}</div>
            <div className="rating">
              {item.rating}
              <FaStar color={"white"} fontSize={"16px"} />
            </div>
            <div className="discount">
              <div className="price">
                <del>
                  <FaArrowDown color={"blue"} />${price(item.price)}
                </del>
              </div>
              <div className="offer">${dis(item.discountPercentage, item.price)}</div>
              <div className="offer offer1" color={"black"}>
                {item.discountPercentage}
                <FaPercent fontSize={"12px"} /> Off
              </div>
              <div className="rating stock">{item.stock} Left</div>
            </div>
            <div className="ship">{item.shippingInformation}</div>
            <div className="delivery">{item.returnPolicy}</div>
            <div className="flex flex-row gap-4 ">
            <div onClick={() => removeFromCart(item.id)} className="text-black hover:text-blue-700 cursor-pointer ">
            SAVE FOR LATER
            </div>
            <div onClick={() => removeFromCart(item.id)} className="text-black hover:text-blue-700 cursor-pointer">
              REMOVE
            </div>
            
            </div>
          </div>
          <div className="">
          Delivery in 2 days, Fri | ₹40Free
          </div>
        </div>
  );
  
}

export default Cart;
