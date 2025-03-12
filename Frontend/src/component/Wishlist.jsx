import React, { useContext,useEffect, useState } from 'react'
import { AppContext } from '../context/Context'
import { FaArrowDown } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import '../component/Card.css'
import "./Product.css";
import Lottie  from 'lottie-react';
function Wishlist() {
const {WishlistItem,setwishlistItem,setwishlist,countwish,removeFromWishList}=useContext(AppContext);
const [data,setdata]=useState("");
const [count,setcount]=useState(0);
function price(v) {
	const pr = v.toFixed(0);
	return pr;
  }
  function dis(v, v1) {
	return (v1 - (v1 * v) / 100).toFixed(1);
  }

const removeitemHandler=async(id)=>
{
   const token=localStorage.getItem('token');
   const render=await removeFromWishList(id,token);
   setcount(render)
}
useEffect(() => {
  setdata(WishlistItem);
}, [count,WishlistItem])


if(data.length===0)
{
  return(
	<>
  <div className="w-[100%] h-[70px]  "> 
	<div className="m-5 h-[60px] border text-2xl pl-2 items-center  flex">My Wishlist ({countwish})</div>
	 </div>
	 <div className="w-[100%] h-[60svh] flex justify-center items-center flex-col" >
      <Lottie
        autoplay
        loop
        path="/Animation1728063282397.json"  
        style={{ height: '300px', width: '300px' }} //css for lottie json 
      />
      <div className="text-2xl">Your WishList is empty!</div>
      <div className="">Explore our wide selection and find something you like</div>
    </div>
	</>
  )

}


  return (
	<>
  <div className="w-[100%] h-[70px]  "> 
	<div className="m-5 h-[60px] border text-2xl pl-2 items-center  flex">My Wishlist ({data.length})</div>
	 </div>
	<div className="w-full h-full flex justify-start items-center  flex-wrap gap-5 pl-5 p-auto">
    
 { data.map((item)=>
 (
	<div key={item._id} className="card ">
	<div className="cardleft flex w-full ">
	  <img className='w-[180px] h-[160px] ' src={item.images[0] || item.images[1]} alt="" />
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
		<div className="offer">
		  ${dis(item.discountPercentage, item.price)}
		</div>
		<div className="offer offer1" color={"black"} >
		  {item.discountPercentage}
		  <FaPercent fontSize={"12px"} />
		  Off
		</div>
		<div className="rating stock">{item.stock} Left</div>
	  </div>
	  <div className="ship">{item.shippingInformation}</div>
	  <div className="delivery">{item.returnPolicy}</div>
	 <button onClick={()=>removeitemHandler(item.wishlistId)}  className="button bg-red-400 hover:bg-red-500">
	  Remove form WishList
	  </button>
	</div>
  </div>
 ))
}
</div>
</>
  )
}

export default Wishlist
