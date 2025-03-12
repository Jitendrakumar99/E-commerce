import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { AppContext } from "../context/Context";
import Logo from "./Logo";
import { RxAvatar } from "react-icons/rx";
import { MdKeyboardArrowDown, MdNotifications, MdLogout, MdPerson } from "react-icons/md";
import { FaShoppingBag, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { countwish, cartItems, WishlistItem, showuser, setshowuser ,isOpen,setIsOpen,UserData} = useContext(AppContext);
  const [useroption, setuseroption] = useState(false);
  const userlogin = localStorage.getItem("isLoggedIn");
  // const UserData = JSON.parse(localStorage.getItem("user") || "{}");UserData

  const handleAvatarClick = () => {
    if (userlogin !== "true") {
      setshowuser(true);
      navigate("/");
    }
  };

  const usernamehandler = () => {
    setuseroption(true);
  };

  const usernamehandler2 = () => {
    setuseroption(false);
  };

  const usernamehandler1 = () => {
    setuseroption(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("token", "");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const navigatecartpage = () => {
    navigate("/cart");
  };

  const navigatenotificationpage = () => {
    setIsOpen(!isOpen);
  };

  const navigateorderpage = () => {
    navigate("/order");
  };

  const navigatewishpage = () => {
    navigate("/wishlist");
  };

  const navigateprofilepage = () => {
    navigate("/profile");
  };

  const navigatetohomepage = () => {
    navigate("/home");
  };

  return (
    <div className="navbar sticky z-50 top-0 justify-between">
      <div onClick={navigatetohomepage} className="logo text-3xl cursor-pointer">
        Go <span className="text-2xl justify-center items-center">Cart</span>
      </div>

      <div className="right1">
        {userlogin === "true" ? (
          <div
            onMouseEnter={usernamehandler}
            onMouseLeave={usernamehandler2}
            className="flex justify-center items-center gap-2 w-40 flex-row border p-1 relative cursor-pointer"
          >
            {UserData.photoURL ? (
              <img 
                src={UserData.photoURL} 
                alt={UserData.displayName||UserData.FirstName} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <RxAvatar className="" fontSize={"30px"} />
            )}
            <span className="text-sm truncate">{UserData.FirstName||UserData.displayName}</span>
            <MdKeyboardArrowDown />
            {useroption && (
              <div className="absolute top-[38px] left-0 z-50 bg-white border border-gray-300 shadow-lg rounded-md flex flex-col items-stretch p-2 w-40">
                <div
                  onClick={navigateprofilepage}
                  className="cursor-pointer w-full px-3 h-[40px] flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  <MdPerson className="text-xl" />
                  <span>My Profile</span>
                </div>
                <div
                  onClick={navigatecartpage}
                  className="cursor-pointer w-full px-3 h-[40px] flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  <FaShoppingCart className="text-xl" />
                  <span>My Cart</span>
                </div>
                <div
                  onClick={navigatewishpage}
                  className="cursor-pointer w-full px-3 h-[40px] flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  <FaHeart className="text-xl" />
                  <span>WishList</span>
                </div>
                <div
                  onClick={navigateorderpage}
                  className="cursor-pointer w-full px-3 h-[40px] flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  <FaShoppingBag className="text-xl" />
                  <span>Order</span>
                </div>
                <div
                  onClick={navigatenotificationpage}
                  className="cursor-pointer w-full px-3 h-[40px] flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  <MdNotifications className="text-xl" />
                  <span>Notification</span>
                </div>
                <div
                  onClick={usernamehandler1}
                  className="cursor-pointer w-full px-3 h-[40px] flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  <MdLogout className="text-xl" />
                  <span>LogOut</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div onClick={handleAvatarClick} className="cursor-pointer">
            <RxAvatar className="" fontSize={"35px"} />
          </div>
        )}
        
        <div className="cardheart">
          <Link to="/wishlist">
            <div className="hearthead">
              <div className="wishShow">{WishlistItem.length}</div>
              <IoMdHeart fontSize={"30px"} />
            </div>
          </Link>
        </div>
        <Link
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
          to="/Cart"
        >
          <div className="cart relative">
            <div className="absolute top-[-6px] bg-gray-400 w-[18px] h-[18px] left-[30%] rounded-full text-black flex justify-center items-center text-[15px]">
              {cartItems.length}
            </div>
            <BsCart3 />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
