import React, { useContext } from 'react';
import Lottie  from 'lottie-react';
import { AppContext } from '../context/Context';
function EmptyCart() {
  const {cartItems}=useContext(AppContext);
  return (
    <>
    <div className="w-[100%] h-[70px]  "> 
    <div className="m-5 h-[60px] border text-2xl pl-2 items-center  flex">My Cart({cartItems.length})</div>
     </div>
    <div className="w-[100%] h-[60svh] flex justify-center items-center flex-col" >
      <Lottie
        autoplay
        loop
        path="/animation.json"  
        style={{ height: '300px', width: '300px' }} //css for lottie json 
      />
      <div className="text-2xl">Your cart is empty!</div>
      <div className="">Explore our wide selection and find something you like</div>
    </div>
    </>
  );
}

export default EmptyCart;
