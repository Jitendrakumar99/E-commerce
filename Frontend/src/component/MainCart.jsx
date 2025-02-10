import React, { useContext,useEffect } from 'react'
import { AppContext } from '../context/Context'
import Cart from './Cart'
import '../component/MainCart.css'
import EmptyCart from "./EmptyCart";
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
function MainCart() {
	const {setCartItems,cartItems,TotalPrice,TotalDisPrice,Quantity,setQuantity,data,Url}=useContext(AppContext)
	console.log("work");
console.log(cartItems);

    // payment integration
    const paynow = async()=>{
      console.log(cartItems);
      
      
      const stripe = await loadStripe("pk_test_51QZaZSDXUaiBwbhKDYxLCYvqezX4AgrejZAjh3TjQJtZFJg69BpnlvWF7Ojx0qKHXujWeLaSCJKGSwm6XHELIiVd00fz1T9jJb");

      const body = {
          products:cartItems
      }
      const headers = {
          "Content-Type":"application/json"
      }
      const response = await fetch(`${Url}getcheckoutdata`,{
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
      })
      const token = localStorage.getItem("token");
      axios.post(`${Url}clearUserCart`, {
          headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log("Cart cleared:", res))
      .catch((error) => console.log("Cart clear error:", error));
      if (response.status === 200) {
        const session = await response.json();

        console.log(session.message); // Log the success message

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });


        
        if (result.error) {
            console.log(result.error);
        }
    }
      
    }
  


  
  
	
		if(cartItems.length===0)
			{
			 return <EmptyCart/>
			}

	else return (     <div className="mainCart w-full h-[100vh] p-5 g-5 flex flex-row">
	<div className="Cartlist1 w-2/3 h-[80vh]  overflow-y-scroll scroll-smooth scrollbar-hide">
      <div className="DelivaryAddress flex justify-between items-center h-[60px] p-4 bg-white w-full border">
        <div className="Address">
          Diliver To : East Godavari-533437
        </div>
        <div className="ChangeAddress w-[150px] cursor-pointer h-[40px] border-2 text-blue-500 rounded-md border-gray-600 flex justify-center items-center text-center bg-white">
          change
        </div>
      </div>
	 
		{cartItems.map((item)=>
		{
		   return <Cart item={item}/>	
		})}
    	 <div className="total-price  border w-full  ">      
             <div onClick={paynow} className="total">PLACE ORDER</div>
      </div>
		</div>
		<div className="PriceDetail w-1/3 px-5">
        <h2 className="h-[60px] flex items-center font-bold text- px-5 bg-white text-gray-600 border-b-2 ">PRICE DETAIL</h2>
        <div className="w-full flex items-center justify-between px-5 h-[50px] ">
          <div className="">Price ({cartItems.length} item)</div>
          <div className="">${TotalPrice.toFixed(2)}</div>
        </div>
        <div className="w-full flex items-center justify-between px-5 h-[50px]">
          <div className="">Discount</div>
          <div className="">${TotalDisPrice.toFixed(2)}</div>
        </div>
        <div className="w-full flex items-center justify-between px-5 h-[50px]">
          <div className="">Platform Fee</div>
          <div className="">$1</div>
        </div>
        <div className="w-full flex items-center justify-between px-5 h-[50px] border-b-2">
          <div className="">Delivery Charges</div>
          <div className="">$4</div>
        </div>
        <div className="w-full flex items-center justify-between px-5 h-[70px] border-b-2">
          <div className="">Total Amount</div>
          <div className="">${(TotalPrice-TotalDisPrice+5).toFixed(2)}</div>
        </div>
        <div className="w-full flex items-center justify-between px-5 h-[50px] border-b-2 border-gray-400">
          <div className="">You will save ${TotalDisPrice.toFixed(2)} on this order</div>
          
        </div>
       
    
	</div>
	</div>
  )
}

export default MainCart
