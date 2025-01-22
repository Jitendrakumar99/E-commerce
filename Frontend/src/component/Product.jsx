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
  const {product,setUrl,cartItems,lod,setfilter,pricerange,rating,fetchdata,disPer,clone,setrating,DiscountP}=useContext(AppContext);
  console.log(product);
  
  const [search,setSearch]=useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const setprice = (e,s) => {
    console.log(s);
    
    if(e.target.checked){
      setfilter(s);
    }
  };
 

  const Search = (e) => {
    const query = e.target.value.toLowerCase();
    
    console.log(query);
    
    setSearch(query);
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = product.filter((data) =>
        data.title.toLowerCase().includes(query) ||
      data.description.toLowerCase().includes(query) ||
      data.category.toLowerCase().includes(query) ||
      // data.brand.toLowerCase().includes(query) ||
      data.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      data.reviews.some((review) =>
      review.comment.toLowerCase().includes(query)
      )
      );
      setFilteredProducts(filtered);
    }
  };

const [selectedCategories, setSelectedCategories] = useState([])

const handleCategoryClick = (e, endpoint) => {
  const isChecked = e.target.checked;

  if (isChecked) {
    setSelectedCategories((prev) => [...prev, endpoint]);
  } else {
    setSelectedCategories((prev) => prev.filter((category) => category !== endpoint));
  }
};

useEffect(() => {
  if (selectedCategories.length > 0) {
    const filtered = product.filter((data) =>
      selectedCategories.some((category) => 
        data.category.toLowerCase().includes(category.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  } else {

    setFilteredProducts(product);
  }
}, [selectedCategories]);

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
              <div className="flex flex-col gap-2">
  <div
    onClick={() => handleCategoryClick('')}
    className="flex flex-row items-center gap-4 h-5 "
    id="all"
  >
    <input className="w-4" id="all-checkbox" type="checkbox" />
    <label htmlFor="all-checkbox">All</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="laptops-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'laptops')}
    />
    <label htmlFor="laptops-checkbox">Laptops</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="home-decoration-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'home-decoration')}
    />
    <label htmlFor="home-decoration-checkbox">Home-decoration</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="groceries-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'groceries')}
    />
    <label htmlFor="groceries-checkbox">Groceries</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="furniture-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'furniture')}
    />
    <label htmlFor="furniture-checkbox">Furniture</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="mens-shirts-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'mens-shirts')}
    />
    <label htmlFor="mens-shirts-checkbox">Mens-shirts</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="mobile-accessories-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'mobile-accessories')}
    />
    <label htmlFor="mobile-accessories-checkbox">Mobile-accessories</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="motorcycle-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'motorcycle')}
    />
    <label htmlFor="motorcycle-checkbox">Motorcycle</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="skin-care-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'skin-care')}
    />
    <label htmlFor="skin-care-checkbox">Skin-care</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="sunglasses-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'sunglasses')}
    />
    <label htmlFor="sunglasses-checkbox">Sunglasses</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="tablets-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'tablets')}
    />
    <label htmlFor="tablets-checkbox">Tablets</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="womens-dresses-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'womens-dresses')}
    />
    <label htmlFor="womens-dresses-checkbox">Womens-dresses</label>
  </div>

  <div className="flex flex-row items-center gap-4 h-5">
    <input
      className="w-4"
      id="womens-jewellery-checkbox"
      type="checkbox"
      onChange={(e) => handleCategoryClick(e,'womens-jewellery')}
    />
    <label htmlFor="womens-jewellery-checkbox">Womens-jewellery</label>
  </div>
</div>
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
                  return <div className="flex flex-row items-center gap-4 m-2 h-5">
                  <input
                    className="w-4"
                    id="laptops-checkbox"
                    type="checkbox"
                    onChange={(e) => setprice(e,data.name)}
                  />
                  <label htmlFor="laptops-checkbox">{data.name1}</label>
                </div>
                 
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
        {/* {lod&&<Loader/>} */}
        <div className="productlist">
        {filteredProducts&&filteredProducts.length > 0
          ? filteredProducts.map((item) => (<Card item={item} key={item._id} />))
          : product&&product.map((item) => <Card item={item} key={item._id} />)}
      </div>
        
        {clone == 0  && <Popup />}

      </div>
    </div>
    </>
  );
}

export default Product;
