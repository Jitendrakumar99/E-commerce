import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./Product.css";
import { FaSearch } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Card from "./Card";
import Loader from "./Loader";
import Popup from "./Popup";
import Banner from "./Banner";
import { AppContext } from "../context/Context";

function Product() {
  // const [id, setid] = useState(0);
  const {product,setUrl,cartItems,lod,setfilter,pricerange,rating,fetchdata,search,setSearch,disPer,clone,setrating,DiscountP}=useContext(AppContext)
 
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  const setprice = (s) => {
    setfilter(s);
  };
 

  const Search = (e) => {
    const newSearch = e.target.value.toLowerCase();
    setSearch(newSearch);
    if (search) {
      fetchdata(`/search?q=${search}`);
    } else {
      fetchdata("");
    }
  };

  const handleCategoryClick = (endpoint) => {
    fetchdata(endpoint);
    setfilter(null);
  };

  return (
    <>
    <div className="productmain">
      <div className="filterleft w-[280px]">
        <div className="filter">Filterdata</div>
        <div className="search">
          <div className="input">
            <div className="same FaSearch">
              <FaSearch />
            </div>
            <input
              className="same"
              type="text"
              value={search}
              placeholder="Search Your Product"
              onChange={(e) => Search(e)}
            />
          </div>
        </div>
        <div className="fil">
          <div onClick={() => setIsOpen4(!isOpen4)} className="fil1">
            {isOpen4 ? (
              <MdKeyboardArrowDown fontSize={"25px"} />
            ) : (
              <MdOutlineKeyboardArrowLeft fontSize={"25px"} />
            )}
            <div className="Category">Category</div>
          </div>
          {isOpen4 && (
            <div className="filcate">
              <div onClick={() => handleCategoryClick('')} className="">All</div>
              <div onClick={() => handleCategoryClick('/category/laptops')} className="">Laptops</div>
              <div onClick={() => handleCategoryClick('/category/home-decoration')} className="">Home-decoration</div>
              <div onClick={() => handleCategoryClick("/category/groceries")} className="">Groceries</div>
              <div onClick={() => handleCategoryClick("/category/furniture")} className="">Furniture</div>
              <div onClick={() => handleCategoryClick("/mens-shirts")} className="">Mens-shirts</div>
              <div onClick={() => handleCategoryClick("/category/mobile-accessories")} className="">Mobile-accessories</div>
              <div onClick={() => handleCategoryClick("/category/motorcycle")} className="">Motorcycle</div>
              <div onClick={() => handleCategoryClick("/category/skin-care")} className="">Skin-care</div>
              <div onClick={() => handleCategoryClick("/category/sunglasses")} className="">Sunglasses</div>
              <div onClick={() => handleCategoryClick("/category/tablets")} className="">Tablets</div>
              <div onClick={() => handleCategoryClick("/category/womens-dresses")} className="">Womens-dresses</div>
              <div onClick={() => handleCategoryClick("/category/womens-jewellery")} className="">Womens-jewellery</div>
            </div>
          )}
        </div>
        <div className="fil">
          <div onClick={() => setIsOpen3(!isOpen3)} className="fil1">
            {isOpen3 ? (
              <MdKeyboardArrowDown fontSize={"25px"} />
            ) : (
              <MdOutlineKeyboardArrowLeft fontSize={"25px"} />
            )}
            <div className="">Price</div>{" "}
          </div>
          {isOpen3 && (
            <div className="filcate">
              {
                pricerange.map((data) => {
                  return <div onClick={() => setprice(data.name)} className="">{data.name1}</div>
                })
              }
            </div>
          )}
        </div>
        <div className="fil">
          <div onClick={() => setIsOpen2(!isOpen2)} className="fil1">
            {isOpen2 ? (
              <MdKeyboardArrowDown fontSize={"25px"} />
            ) : (
              <MdOutlineKeyboardArrowLeft fontSize={"25px"} />
            )}
            <div className="">Rating</div>{" "}
          </div>
          {isOpen2 && (
            <div className="filcate">
              {
                rating.map((data) => {
                  return <div onClick={() => setrating(data.name)} className="">{data.name1} </div>
                })
              }
            </div>
          )}
        </div>
        <div className="fil">
          <div onClick={() => setIsOpen1(!isOpen1)} className="fil1">
            {isOpen1 ? (
              <MdKeyboardArrowDown fontSize={"25px"} />
            ) : (
              <MdOutlineKeyboardArrowLeft fontSize={"25px"} />
            )}
          <div className="">DiscountPercentage</div>{" "}
          </div>
          {isOpen1 && (
            <div className="filcate">
              {
                DiscountP.map((data) => {
                  return <div onClick={() => disPer(data.name1)} className="">{data.name} </div>
                })
              }
            </div>
          )}
        </div>
        <div className="fil">
          <div onClick={() => setIsOpen5(!isOpen5)} className="fil1">
            {isOpen5 ? (
              <MdKeyboardArrowDown fontSize={"25px"} />
            ) : (
              <MdOutlineKeyboardArrowLeft fontSize={"25px"} />
            )}
          <div className="">Delivery</div>{" "}
          </div>
          {isOpen5 && (
            <div className="filcate">
              {
                DiscountP.map((data) => {
                  return <div onClick={() => disPer(data.name1)} className="">Faster delivery </div>
                })
              }
            </div>
          )}
        </div>
      </div>
      <div className="product">
        <div className="producthead">
          <Banner />
        </div>
        {lod&&<Loader/>}
        <div className="productlist">
          {product && product.map((item) => (
            // console.log(item),
            <Card item={item} key={cartItems} />
          ))}
             
        </div>
        
        {clone == 0  && <Popup />}

      </div>
    </div>
    </>
  );
}

export default Product;
