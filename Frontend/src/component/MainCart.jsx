import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import Cart from "./Cart";
import "../component/MainCart.css";
import EmptyCart from "./EmptyCart";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// Initialize Stripe outside component to avoid re-initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function MainCart() {
  const {
    setCartItems,
    cartItems,
    TotalPrice,
    TotalDisPrice,
    Quantity,
    setQuantity,
    data,
    Url,
  } = useContext(AppContext);
  
  // Add this line for debugging
  console.log('Stripe Key:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  
  console.log("work");
  console.log(cartItems);
  const [currentorder, setCurrentorder] = useState([]);
  // payment integration
  const paynow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to place order");
        return;
      }

      // First store all orders in backend
      const storeOrderPromises = cartItems.map(async (item) => {
        try {
          const response = await axios.post(
            `${Url}storeOrder`,
            { product: item },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          );
          return response.data;
        } catch (error) {
          throw new Error(`Failed to store order for ${item.title}`);
        }
      });

      // Wait for all orders to be stored
      await Promise.all(storeOrderPromises);

      // After successful storage, proceed with Stripe payment
      // const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      
      // if (!stripeKey) {
      //   throw new Error('Stripe publishable key is missing. Please check your environment variables.');
      // }

      const stripe = await loadStripe("pk_test_51QZaZSDXUaiBwbhKDYxLCYvqezX4AgrejZAjh3TjQJtZFJg69BpnlvWF7Ojx0qKHXujWeLaSCJKGSwm6XHELIiVd00fz1T9jJb");

      if (!stripe) {
        throw new Error('Failed to initialize Stripe. Please check your publishable key.');
      }

      const body = {
        products: cartItems,
        totalAmount: (TotalPrice - TotalDisPrice + 5).toFixed(2) // Include total amount
      };

      const response = await fetch(`${Url}getcheckoutdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session');
      }

      // Clear cart after successful order storage and before payment
      await axios.post(
        `${Url}clearUserCart`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      setCurrentorder(cartItems);

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error(error.message || "Failed to process order. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  } else
    return (
      <div className="mainCart w-full h-fi p-2 md:p-5 flex flex-col lg:flex-row gap-4 pb-24 lg:pb-5">
        <div className="Cartlist1 w-full lg:w-2/3 overflow-y-auto">
          <div className="DelivaryAddress flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 md:p-4 bg-white w-full border rounded-lg mb-4">
            <div className="Address text-sm md:text-base mb-2 sm:mb-0">
              Deliver To : East Godavari-533437
            </div>
            <button className="ChangeAddress w-full sm:w-[150px] py-2 px-4 cursor-pointer border-2 text-blue-500 rounded-md border-gray-600 hover:bg-blue-50 transition-colors">
              Change
            </button>
          </div>

          {cartItems.map((item) => (
            <Cart key={item.id} item={item} />
          ))}
        </div>

        <div className="PriceDetail w-full lg:w-1/3 flex flex-col">
          <div className="bg-white rounded-lg shadow-sm">
            <h2 className="h-[60px] flex items-center font-bold text-lg px-4 bg-white text-gray-700 border-b rounded-t-lg">
              PRICE DETAILS
            </h2>
            <div className="price-details-content p-4 space-y-4">
              <div className="flex items-center justify-between text-sm md:text-base">
                <span>Price ({cartItems.length} item)</span>
                <span className="font-medium">${TotalPrice.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-sm md:text-base">
                <span>Discount</span>
                <span className="text-green-600">
                  -${TotalDisPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm md:text-base">
                <span>Platform Fee</span>
                <span>$1.00</span>
              </div>

              <div className="flex items-center justify-between text-sm md:text-base pb-4 border-b">
                <span>Delivery Charges</span>
                <span>$4.00</span>
              </div>

              <div className="flex items-center justify-between text-base md:text-lg font-bold py-4 border-b">
                <span>Total Amount</span>
                <span>${(TotalPrice - TotalDisPrice + 5).toFixed(2)}</span>
              </div>

              <div className="text-sm md:text-base text-green-600 font-medium py-2">
                You will save ${TotalDisPrice.toFixed(2)} on this order
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="fixed bottom-0 left-0 right-0 lg:static p-4 bg-white border-t lg:border-0 lg:mt-4 z-10">
            <button
              onClick={paynow}
              className="w-full py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    );
}

export default MainCart;
