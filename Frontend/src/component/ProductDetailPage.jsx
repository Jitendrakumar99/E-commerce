import React, { useContext ,useState} from 'react'
import { AppContext } from '../context/Context'
import './ProductDetailPage.css'
import { Tilt } from 'react-tilt'
import { CiCircleInfo } from "react-icons/ci";
import PriceDetails from './PriceDetails ';
import { MdLocalOffer } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import '../component/Card.css'
function ProductDetailPage() {
	const {productinfo ,setCartItems,cartItems,product,addToCart}=useContext(AppContext);
	console.log(productinfo);
  function dis(v, v1) {
    return (v - (v1 * v) / 100).toFixed(1);
  }
	const products = {
		id: 1,
		title: `${productinfo.title}`,
		price: dis(productinfo.price,productinfo.discountPercentage),
		originalPrice: `${productinfo.price}`,
		discount: `${productinfo.discountPercentage}`,
		rating: `${productinfo.rating}`,
		totalRatings: 957,
		reviews: 584,
		offers: [
		  { id: 1, text: "5% Unlimited Cashback on Flipkart Axis Bank Credit Card" },
		  { id: 2, text: "10% off up to ₹1,500 on HDFC Bank Credit Card Transactions" },
		  { id: 3, text: "10% off up to ₹1,750 on HDFC Bank Credit Card EMI Transactions" }
		]
	  };
	
	  // State to manage the product quantity
	  const [quantity, setQuantity] = useState(1);
    const [showprice,setShowprice]=useState(false);
	  const navigate=useNavigate();
	  // Function to handle the Add to Cart action
    const [addtocartbtnchange1,setAddtocartchange1]=useState(productinfo.update);
    const setitemid = (id) => {
      if (id) {
        const token=localStorage.getItem('token');
        const data = {
          productId: id,
          quantity: 1,
        };
        addToCart(data,token);
      }
      toast.success("Item is Added to Cart");
      setAddtocartchange1(false);
    };
    const setitemid1 = (id) => {
      if (id) {
        navigate('/Cart')
      }
      setAddtocartchange1(true);
    };
	
	  // Function to handle the Buy Now action
	  const handleBuyNow = () => {
		alert(`Proceed to buy ${product.title}`);
	  };
	const [imgindex,setImgindex]=useState(0);
  const defaultOptions = {
    reverse:        false,  // reverse the tilt direction
    max:            2,     // max tilt rotation (degrees)
    perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
    speed:          2000,   // Speed of the enter/exit transition
    transition:     true,   // Set a transition on enter/exit.
    axis:           null,   // What axis should be disabled. Can be X or Y.
    reset:          true,    // If the tilt effect has to be reset on exit.
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }
  

  return (
	<div className="product-container sm:flex-col md:flex-row flex-col">
      <div className="product-images border-gray-300 border flex justify-center items-center w-full">
     <Tilt options={defaultOptions} className="tilt">
        <img  src={productinfo.images[imgindex]||productinfo.images[imgindex]||productinfo.images[2]} alt={productinfo.title} className="product-main-image" />
        </Tilt>
        <div className=" absolute z-[10px] text-3xl top-[75%] left-[40%]  ">{productinfo.brand}</div>
        <div className="smallimg">
		{             
             productinfo.images && productinfo.images.map((ig, index) => (
             <img key={index} className='cursor-pointer ' onClick={()=>setImgindex(index)} src={ig} alt={`product image ${index}`} />
            ))
		}
		{
             productinfo.images && productinfo.images.map((ig, index) => (
             <img key={index} className='cursor-pointer ' onClick={()=>setImgindex(index)} src={ig} alt={`product image ${index}`} />
            ))
        }
			
		</div>
      </div>
      
      <div className="product-details overflow-y-scroll scroll-smooth scrollbar-hide w-full h-[100vh]">
        <h1>{products.title}</h1>
        <div className="product-rating flex gap-5">
          <span className="rating">{products.rating} ★</span>
          <span>{products.totalRatings} Ratings & {products.reviews} Reviews</span>
        </div>
        <div className="product-price flex ">
          <span className="current-price">${products.price}</span>
          <span className="original-price">${products.originalPrice}</span>
          <span className="discount w-fit">{products.discount}% off</span>
          <CiCircleInfo className='text-3xl' onMouseEnter={()=>setShowprice(true)} onMouseLeave={()=>setShowprice(false)} />
         {showprice&&<PriceDetails/>}
        </div>

        <div className="product-offers mb-5">
          <h4>Available offers</h4>
          <div className='flex flex-col w-full'>
            <div className="hello flex flex-col">
            {products.offers.map((offer) => (

           <div className='flex justify-start gap-2 items-center '>  <MdLocalOffer className='text-green-700' /> <div key={offer.id}>{offer.text}</div></div>
            ))}
          </div>
          </div>
        </div>
        <div className="flex  gap-7">
          <div className="">
          <div className="h-[30px]">deliver to</div>
          <select name="" className='w-[300px] h-[40px] border ' id="">
            <option className='h-[40px] p-2' value="">Set Address</option>
            <option className='h-[40px] ' value="">Kakinada</option>
            <option className='h-[40px] ' value="">Kakinada</option>
            <option className='h-[40px] ' value="">Kakinada</option>
            <option className='h-[40px] ' value="">Kakinada</option>
            <option className='h-[40px] ' value="">Kakinada</option>
          </select>
          </div>
          <div className="name ">
            <div className="flex items-center text-xl top-[20px]">
              <div className="">Services</div>
              <ImLocation2 />
              <div className="">{productinfo.shippingInformation}</div>
            </div>
          </div>
        </div>

        <div className="product-actions flex  items-center p-2 gap-5">
        {addtocartbtnchange1?
        <button onClick={() => setitemid(productinfo._id)} className="button bg-green-500">
          Add to Cart
        </button>:<button onClick={() => setitemid1(productinfo._id)} className="button bg-red-400 hover:bg-red-500">
            Go to Cart
        </button>}
          <button className="button buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
        <div className="w-[100%]  p-5 text-2xl pl-0 ">Rating & Raview</div>
        {/* {console.log(productinfo.reviews)
        } */}
  <div className="w-full h-auto space-y-4 bg-gray-50 p-4 pl-0 rounded-lg">
  {productinfo.reviews.map((item, index) => (
    <div key={index} className="w-full bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold text-yellow-500">
          Rating: {item.rating} ★
        </div>
        <div className="text-sm text-gray-500">{item.date}</div>
      </div>
      <div className="mb-2 text-gray-800">{item.comment}</div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="font-medium">{item.reviewerName}</div>
        <div>{item.reviewerEmail}</div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
  
}

export default ProductDetailPage
