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

  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(product);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([])
  // const setprice = (e,s) => {
  //   console.log(s);
  //   if(e.target.checked){
  //     setfilter(s);
  //   }
  // };
 
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



// const handleCategoryClick = (e, endpoint) => {
//   const isChecked = e.target.checked;

//   if (isChecked) {
//     setSelectedCategories((prev) => [...prev, endpoint]);
//   } else {
//     setSelectedCategories((prev) => prev.filter((category) => category !== endpoint));
//   }
// };

// useEffect(() => {
//   if (selectedCategories.length > 0) {
//     const filtered = product.filter((data) =>
//       selectedCategories.some((category) => 
//         data.category.toLowerCase().includes(category.toLowerCase())
//       )
//     );
//     setFilteredProducts(filtered);
//   } else {

//     setFilteredProducts(product);
//   }
// }, [selectedCategories]);
 // 🟢 Category Filter Logic
 const handleCategoryClick = (e, category) => {
  const isChecked = e.target.checked;
  let updatedCategories = isChecked
    ? [...selectedCategories, category.toLowerCase()]
    : selectedCategories.filter((c) => c !== category.toLowerCase());
  setSelectedCategories(updatedCategories);
  applyFilters(search, updatedCategories, selectedPriceRange, selectedRating, selectedDiscount, fastDelivery);
};

// 🟢 Price Filter Logic
const setPrice = (e, priceRange) => {
  const isChecked = e.target.checked;
  let updatedPriceRange = isChecked
    ? [...selectedPriceRange, priceRange]
    : selectedPriceRange.filter((p) => p !== priceRange);
  setSelectedPriceRange(updatedPriceRange);
  console.log(selectedPriceRange);
  
  applyFilters(search, selectedCategories, updatedPriceRange, selectedRating, selectedDiscount, fastDelivery);
};

// 🟢 Rating Filter Logic
const setRatingFilter = (rating) => {
  setSelectedRating(rating);
  applyFilters(search, selectedCategories, selectedPriceRange, rating, selectedDiscount, fastDelivery);
};

// 🟢 Discount Filter Logic
const setDiscountFilter = (discount) => {
  setSelectedDiscount(discount);
  applyFilters(search, selectedCategories, selectedPriceRange, selectedRating, discount, fastDelivery);
};

// 🟢 Delivery Filter Logic
const setDeliveryFilter = () => {
  setFastDelivery(!fastDelivery);
  applyFilters(search, selectedCategories, selectedPriceRange, selectedRating, selectedDiscount, !fastDelivery);
};

// 🟢 Apply All Filters Together
const applyFilters = (query, categories, priceRange, rating, discount, fastDelivery) => {
  let filtered = product;

  if (query.trim() !== "") {
    filtered = filtered.filter((data) =>
      data.title.toLowerCase().includes(query) ||
      data.description.toLowerCase().includes(query) ||
      data.category.toLowerCase().includes(query) ||
      data.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      data.reviews.some((review) => review.comment.toLowerCase().includes(query))
    );
  }

  if (categories.length > 0) {
    filtered = filtered.filter((data) => categories.includes(data.category.toLowerCase()));
  }

  if (priceRange.length > 0) {
    // console.log(priceRange);
    
    filtered = filtered.filter((data) =>
      priceRange.some((range) => range >= data.price) 
    );
  }

  if (rating) {
    filtered = filtered.filter((data) => Math.floor(data.rating) == rating);
  }

  if (discount) {
    filtered = filtered.filter((data) => Math.floor(data.discountPercentage) >= discount);
  }

  if (fastDelivery) {
    filtered = filtered.filter((data) => data.fastDelivery === true);
  }

  setFilteredProducts(filtered);
};

useEffect(() => {
  setFilteredProducts(product);
}, [product]);
  return (
    <>
    <div className="productmain flex-col">
    <div className="filter-container bg-gray-100 p-3 shadow-md rounded-lg">
  <div className="flex flex-wrap justify-between items-center gap-4 px-4">
    {/* Search Bar */}
   

    {/* Filters */}
    <div className="flex flex-wrap gap-4">
      {/* Category Filter */}
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg bg-white shadow-sm">
          <span className="font-semibold">Category</span>
          <MdKeyboardArrowDown fontSize="20px" />
        </div>
        <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block transition duration-200 ease-in-out z-10">
          {[
            "All",
            "Laptops",
            "home-decoration",
            "Groceries",
            "Furniture",
            "Mens-Shirts",
            "mobile-accessories",
            "Motorcycle",
            "Skin-Care",
            "Sunglasses",
            "Tablets",
            "Womens-Dresses",
            "Womens-Jewellery",
          ].map((category) => (
            <div key={category} className="flex items-center gap-2 p-1 hover:bg-gray-200 cursor-pointer">
            <input type="checkbox" className="w-4" onChange={(e) => handleCategoryClick(e, category)} />
            <label>{category}</label>
          </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg bg-white shadow-sm">
          <span className="font-semibold">Price</span>
          <MdKeyboardArrowDown fontSize="20px" />
        </div>
        <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block transition duration-200 ease-in-out z-10">
          {pricerange.map((data) => (
            <div key={data.name} className="flex items-center gap-2 p-1 hover:bg-gray-200 cursor-pointer">
              <input type="checkbox" className="w-4" onChange={(e) => setPrice(e, data.name)}/>
              <label>{data.name1}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg bg-white shadow-sm">
          <span className="font-semibold">Rating</span>
          <MdKeyboardArrowDown fontSize="20px" />
        </div>
        <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block transition duration-200 ease-in-out z-10">
          {rating.map((data) => (
            <div key={data.name} className="p-1 hover:bg-gray-200 cursor-pointer" onClick={() => setRatingFilter(data.name)}>
              {data.name1}
            </div>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg bg-white shadow-sm">
          <span className="font-semibold">Discount %</span>
          <MdKeyboardArrowDown fontSize="20px" />
        </div>
        <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block transition duration-200 ease-in-out z-10">
          {DiscountP.map((data) => (
            <div key={data.name} className="p-1 hover:bg-gray-200 cursor-pointer" onClick={() => setDiscountFilter(data.name1)}>
              {data.name}
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Filter */}
      <div className="relative group">
        <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg bg-white shadow-sm">
          <span className="font-semibold">Delivery</span>
          <MdKeyboardArrowDown fontSize="20px" />
        </div>
        <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block transition duration-200 ease-in-out z-10">
          <div className="p-1 hover:bg-gray-200 cursor-pointer" onClick={() => disPer("Fast Delivery")}>
            Faster delivery
          </div>
        </div>
      </div>
      <div className="relative group">
  <div className="flex items-center gap-2 cursor-pointer p-2 border rounded-lg bg-white shadow-sm">
    <span className="font-semibold">Clear Filters</span>
    <span className="text-gray-500 text-lg cursor-pointer">&times;</span>
  </div>
  <div className="absolute right-0 mt-0.5 w-36 bg-white shadow-lg rounded-lg p-3 hidden group-hover:block transition duration-200 ease-in-out z-10">
    <div
      className=" hover:bg-gray-200 cursor-pointer text-center text-red-500 font-semibold"
      onClick={() => {
        setSelectedCategories([]);
        setFilteredProducts(product); 
        setSelectedPriceRange([])
        setSelectedCategories([])
       
      }}
    >
      Reset All Filters
    </div>
  </div>
</div>

    </div>
    <div className="search-container relative w-full max-w-md">
  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
  <input
    className="w-full px-12 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
    type="text"
    value={search}
    placeholder="Search products..."
    onChange={(e) => Search(e)}
  />
</div>

  </div>
</div>




      <div className="product">
        <div className="producthead z-0 h-5">
          {/* <Banner /> */}
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
