import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { AppContext } from "../context/Context";
import Logo from "./Logo";
import { RxAvatar } from "react-icons/rx";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const { countwish, cartItems,WishlistItem, showuser, setshowuser } =
    useContext(AppContext);
  const [useroption, setuseroption] = useState(false);
  const userlogin = localStorage.getItem("isLoggedIn");
  const usernamehandler = () => {
    setuseroption(true);
    // localStorage.setItem("userlogin","false");
  };
  const usernamehandler2 = () => {
    setuseroption(false);
    // localStorage.setItem("userlogin","false");
  };

  const usernamehandler1 = () => {
    setuseroption(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("token", "");
  };
  const navigatecartpage = () => {
    navigate("/cart");
  };
  const navigatenotificationpage = () => {
    navigate("/cart");
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
  return (
    <div className="navbar sticky z-50 top-0">
      <div className="logo text-3xl ">
        Go <span className="text-2xl justify-center items-center">Cart</span>{" "}
      </div>
      <nav className="nav">
        <Link
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
          to="/home"
        >
          <li>Home</li>
        </Link>
        <Link
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
          to="/category"
        >
          <li>Category</li>
        </Link>
        <Link
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
          to="/About"
        >
          <li>About</li>
        </Link>
        <Link
          className={(e) => {
            return e.isActive ? "red" : "";
          }}
          to="/contact"
        >
          <li>Contact</li>
        </Link>
      </nav>

      <div className="right1 ">
        {userlogin === "true" ? (
          <div
            onMouseEnter={usernamehandler}
            onMouseLeave={usernamehandler2}
            className="flex justify-center items-center gap-2 w-40 flex-row border p-1 relative "
          >
            <RxAvatar className="" fontSize={"30px"} />
            {showuser}
            {useroption && (
              <div className="absolute top-[38px] left-0 z-50 bg-white border border-gray-300 shadow-lg rounded-md flex flex-col items-center justify-center space-y-2 p-2 w-40">
                <div
                  onClick={navigateprofilepage}
                  className="cursor-pointer w-full text-center h-[35px] flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  My Profile
                </div>
                <div
                  onClick={navigatecartpage}
                  className="cursor-pointer w-full text-center h-[35px] flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  My Cart
                </div>
                <div
                  onClick={navigatewishpage}
                  className="cursor-pointer w-full text-center h-[35px] flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  WishList
                </div>
                <div
                  onClick={navigateorderpage}
                  className="cursor-pointer w-full text-center h-[35px] flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  Order
                </div>
                <div
                  onClick={navigatenotificationpage}
                  className="cursor-pointer w-full text-center h-[35px] flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  Notification
                </div>
                <div
                  onClick={usernamehandler1}
                  className="cursor-pointer w-full text-center h-[35px] flex items-center justify-center rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition duration-200"
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/">
            <RxAvatar className="" fontSize={"35px"} />
          </Link>
        )}
        {/* <Link to="/ImageForm" >upload</Link> */}
        <div className="cardheart">
          <Link to="/wishlist">
            {" "}
            <div className="hearthead">
              {" "}
              <div className="wishShow">{countwish}</div>{" "}
              <IoMdHeart fontSize={"30px"} />{" "}
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
            {" "}
            <div className="absolute top-[-6px] bg-gray-400 w-[18px] h-[18px] left-[30%] rounded-full text-black flex justify-center items-center text-[15px] ">
              {cartItems.length}
            </div>{" "}
            <BsCart3 />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
