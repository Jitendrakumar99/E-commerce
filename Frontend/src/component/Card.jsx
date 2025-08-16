import React, { useContext, useState, useEffect} from "react";
import { FaArrowDown } from "react-icons/fa6";
import axios from "axios";
import "./Product.css";
import "./Card.css";
import { FaStar } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

function Card({ item }) {
  function price(v) {
    const pr = v.toFixed(0);
    return pr;
  }
  function dis(v, v1) {
    return (v1 - (v1 * v) / 100).toFixed(1);
  }

  const {
    product,
    productinfo,
    setwishlist,
    countwish,
    cartItems,
    setCartItems,
    setProductinfo,
    WishlistItem,
    setwishlistItem,
    addToCart,
    addToWishList,
    removeFromCart,
    removeFromWishList
  } = useContext(AppContext);
  const [addtocartbtnchange, setAddtocartchange] = useState(true);
  const [slickimageshow, setslickimageshow] = useState(false);
  const slickimagehandler = () => {
    setslickimageshow(true);
  };
  const slickimagehandler1 = () => {
    setslickimageshow(false);
  };
  const [heartcolor, setheartcolor] = useState(false);
  const check = () => {
    const itemExists = cartItems.some((data) => data._id === item._id);
    if (itemExists) {
      setAddtocartchange(false);
    }
    const WishExists = WishlistItem.some((data) => data._id === item._id);
    if (WishExists) {
      setheartcolor(true);
    }
  };
  useEffect(() => {
    check();
  }, [cartItems]);


const navigate=useNavigate();
  const setitemid = (action, id) => {
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to continue");
      return;
    }
    if (action === "add") {
      const data = {
        productId: id,
        quantity: 1,
      };
      addToCart(data,token);
      navigate('/Cart')
      } 
      else if (action === "remove") {
      const data = {
        productId: id,
      };
      removeFromCart(data,token)
    } 
    else
    {
      console.error("Invalid action provided:", action);
      toast.error("Invalid action");
    }
  };

  
  const heartcount = (check,id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to continue");
      return;
    }
    if(check=="add"){
      addToWishList(id,token);
      setheartcolor(true);
    }
    else{
      removeFromWishList(id,token)
      setheartcolor(false);
    }
  };
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    
    setTimeout(() => {
      setProductData(item); 
      setLoading(false); 
    }, 2000); // 
  }, [item]);
  const LoadingCard = () => (
    // <div class="shimmer-effect">
    <div className="card skeleton-card shimmer-effect">
      <div className="cardleft">
        <div className="skeleton skeleton-image"></div>
      </div>
      <div className="cardright">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-rating"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
    // </div>
  );
 
  const handleProductClick = () => {
    setProductinfo({...item, update: addtocartbtnchange});
    // Store the product data in localStorage
    localStorage.setItem('currentProduct', JSON.stringify({...item, update: addtocartbtnchange}));
  };

  return (
    // <Tilt className="tilt" tiltReverse={true} scale={1.1} z-Index={999} transitionSpeed={2500}>
<>
{loading
        ? Array.from({ length: 1 }).map((_, index) => <LoadingCard key={index} />)
        : 
    <div key={item._id} className="card">
      <div className="cardleft ">
        <Link
          onClick={handleProductClick}
          onMouseEnter={slickimagehandler}
          onMouseLeave={slickimagehandler1}
          className="link cursor-pointer"
          to="/detail"
        >
          <img src={item.images[0] || item.images[1]} alt="" />
        </Link>

        {
  heartcolor ? (
    <div onClick={() => heartcount("remove", item._id)} className="heart1">
      <IoMdHeart fontSize={"25px"} />
    </div>
  ) : (
    <div onClick={() => heartcount("add", item._id)} className="heart">
      <IoMdHeart fontSize={"25px"} />
    </div>
  )
}

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
          <div className="offer offer1" color={"black"}>
            {item.discountPercentage}
            <FaPercent fontSize={"12px"} />
            Off
          </div>
          <div className="rating stock">{item.stock} Left</div>
        </div>
        <div className="ship">{item.shippingInformation}</div>
        <div className="delivery">{item.returnPolicy}</div>
        {addtocartbtnchange ? (
          <button onClick={() => setitemid("add", item._id)} className="button">
            Add to Cart
          </button>
        ) : (
          <button
            onClick={() => setitemid("remove", item._id)}
            className="button bg-red-400 hover:bg-red-500"
          >
            Remove form Cart
          </button>
        )}
      </div>
    </div>
}
    </>
    // </Tilt>
  );
}

export default Card;
