import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { AppContext } from '../context/Context'
import './ProductDetailPage.css'
import { Tilt } from 'react-tilt'
import { CiCircleInfo } from "react-icons/ci";
import PriceDetails from './PriceDetails ';
import { MdLocalOffer } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import '../component/Card.css'

function ProductDetailPage() {
	const {productinfo, setProductinfo, UserData, Url} = useContext(AppContext);
	const navigate = useNavigate();
	const [localReviews, setLocalReviews] = useState([]);
	const [isLoadingReviews, setIsLoadingReviews] = useState(true);

	// Add function to fetch reviews
	const fetchReviews = async (productId) => {
		try {
			setIsLoadingReviews(true);
			const response = await axios.get(`${Url}getreview/${productId}`);
			// Ensure we're setting an array
			const reviews = Array.isArray(response.data) ? response.data : 
						   response.data?.reviews ? response.data.reviews : [];
			setLocalReviews(reviews);
		} catch (err) {
			console.error('Error fetching reviews:', err);
			setLocalReviews([]); // Set empty array on error
			toast.error('Failed to load reviews');
		} finally {
			setIsLoadingReviews(false);
		}
	};

	// Handle page load/refresh
	useEffect(() => {
		const loadProductAndReviews = async () => {
			try {
				// Get stored product data
				const storedProduct = localStorage.getItem('currentProduct');
				
				if (!productinfo?._id && storedProduct) {
					const parsedProduct = JSON.parse(storedProduct);
					setProductinfo(parsedProduct);
					await fetchReviews(parsedProduct._id);
				} else if (productinfo?._id) {
					await fetchReviews(productinfo._id);
				} else {
					navigate('/home');
				}
			} catch (error) {
				console.error('Error loading product data:', error);
				setLocalReviews([]); // Ensure we have an empty array on error
			}
		};

		loadProductAndReviews();
	}, []);

	// Use productinfo from context or localStorage
	const currentProduct = productinfo?._id ? productinfo : JSON.parse(localStorage.getItem('currentProduct'));

	// If no product data, show loading or redirect
	if (!currentProduct) {
		return null;
	}

	function dis(v, v1) {
		return (v - (v1 * v) / 100).toFixed(1);
	}

	const products = {
		id: 1,
		title: `${currentProduct.title}`,
		price: dis(currentProduct.price, currentProduct.discountPercentage),
		originalPrice: `${currentProduct.price}`,
		discount: `${currentProduct.discountPercentage}`,
		rating: `${currentProduct.rating}`,
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
	const [addtocartbtnchange1,setAddtocartchange1]=useState(currentProduct.update);
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
		alert(`Proceed to buy ${currentProduct.title}`);
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
	
	const [showRatingForm, setShowRatingForm] = useState(false);
	const [ratingData, setRatingData] = useState({
		rating: 0,
		comment: '',
		date:Date.now()
	});
	const [hoveredRating, setHoveredRating] = useState(0);

	const handleRatingChange = (value) => {
		setRatingData(prev => ({ ...prev, rating: value }));
	};

	const handleCommentChange = (e) => {
		setRatingData(prev => ({ ...prev, comment: e.target.value }));
	};

	const handleSubmitRating = async (e) => {
		e.preventDefault();
		if (ratingData.rating === 0) {
			toast.error("Please select a rating");
			return;
		}
		if (!ratingData.comment.trim()) {
			toast.error("Please add a comment");
			return;
		}

		try {
			const newReview = {
				rating: ratingData.rating,
				comment: ratingData.comment,
				reviewerEmail: UserData.Email,
				reviewerName: UserData.displayName,
				date: new Date().toISOString(),
				productId: currentProduct._id
			};

			await axios.post(`${Url}Addreview`, newReview);
			await fetchReviews(currentProduct._id); // Refresh reviews

			setRatingData({ 
				rating: 0, 
				comment: '',
				reviewerEmail: UserData.Email,
				reviewerName: UserData.displayName,
				date: Date.now()
			});
			setShowRatingForm(false);
			toast.success("Thank you for your review!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to submit review");
		}
	};

	return (
		<div className="product-container sm:flex-col md:flex-row flex-col">
			<div className="product-images border-gray-300 border flex justify-center items-center w-full">
				<Tilt options={defaultOptions} className="tilt">
					<img src={currentProduct.images[imgindex] || currentProduct.images[imgindex] || currentProduct.images[2]} 
						 alt={currentProduct.title} 
						 className="product-main-image" />
				</Tilt>
				<div className="absolute z-[10px] text-3xl top-[75%] left-[40%]">{currentProduct.brand}</div>
				<div className="smallimg">
					{currentProduct.images && currentProduct.images.map((ig, index) => (
						<img key={index} 
							 className='cursor-pointer' 
							 onClick={() => setImgindex(index)} 
							 src={ig} 
							 alt={`product image ${index}`} />
					))}
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
							<div className='flex justify-start gap-2 items-center '>  
								<MdLocalOffer className='text-green-700' /> 
								<div key={offer.id} className="text-sm sm:text-base">{offer.text}</div>
							</div>
						))}
						</div>
					</div>
				</div>

				{/* Delivery Section */}
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-7 mb-5">
					<div className="w-full sm:w-auto">
						<div className="text-sm sm:text-base mb-1">Deliver to</div>
						<select className='w-full sm:w-[300px] h-[40px] border rounded-lg px-2 text-sm sm:text-base'>
							<option value="">Set Address</option>
							<option value="kakinada">Kakinada</option>
							<option value="rajahmundry">Rajahmundry</option>
							<option value="vizag">Vizag</option>
							<option value="hyderabad">Hyderabad</option>
							<option value="bangalore">Bangalore</option>
						</select>
					</div>
					<div className="delivery-info">
						<div className="flex items-center gap-2 text-sm sm:text-base">
							<div>Services</div>
							<ImLocation2 className="text-base sm:text-lg" />
							<div className="text-sm sm:text-base">{currentProduct.shippingInformation}</div>
						</div>
					</div>
				</div>

				<div className="product-actions flex items-center p-2 gap-5">
					{addtocartbtnchange1 ? (
						<button onClick={() => setitemid(currentProduct._id)} className="button bg-green-500">
							Add to Cart
						</button>
					) : (
						<button onClick={() => setitemid1(currentProduct._id)} className="button bg-red-400 hover:bg-red-500">
							Go to Cart
						</button>
					)}
					<button className="button buy-now" onClick={handleBuyNow}>Buy Now</button>
				</div>

				<div className="flex justify-between items-center mb-4">
					<div className="text-lg sm:text-2xl font-semibold">Ratings & Reviews</div>
					<button 
						onClick={() => setShowRatingForm(!showRatingForm)}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
					>
						Rate this Product
					</button>
				</div>

				{showRatingForm && (
					<div className="bg-white shadow-md rounded-lg p-4 mb-6">
						<form onSubmit={handleSubmitRating} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
								<div className="flex gap-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<FaStar
											key={star}
											className={`text-2xl cursor-pointer transition-colors ${
												star <= (hoveredRating || ratingData.rating) 
													? 'text-yellow-400' 
													: 'text-gray-300'
											}`}
											onClick={() => handleRatingChange(star)}
											onMouseEnter={() => setHoveredRating(star)}
											onMouseLeave={() => setHoveredRating(0)}
										/>
									))}
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
								<textarea
									value={ratingData.comment}
									onChange={handleCommentChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
									rows="4"
									placeholder="Share your thoughts about the product..."
									required
								/>
							</div>

							<div className="flex justify-end gap-3">
								<button
									type="button"
									onClick={() => setShowRatingForm(false)}
									className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
								>
									Submit Review
								</button>
							</div>
						</form>
					</div>
				)}
				
				<div className="w-full space-y-3 sm:space-y-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
					{isLoadingReviews ? (
						<div className="text-center py-4">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
							<div className="mt-2 text-gray-500">Loading reviews...</div>
						</div>
					) : (
						<>
							{Array.isArray(localReviews) && localReviews.length > 0 ? (
								localReviews.map((item, index) => (
									<div key={index} className="w-full bg-white shadow-md rounded-lg p-3 sm:p-4">
										<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-2">
											<div className="flex items-center gap-2">
												<div className="text-base sm:text-lg font-semibold text-yellow-500">
													Rating: {item.rating} ★
												</div>
												<div className="text-xs sm:text-sm text-gray-500">
													{new Date(item.date).toLocaleDateString()}
												</div>
											</div>
										</div>
										<div className="mb-2 text-sm sm:text-base text-gray-800">{item.comment}</div>
										<div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs sm:text-sm text-gray-500 gap-1 sm:gap-0">
											<div className="font-medium">{item.reviewerName}</div>
											<div className="break-all sm:break-normal">{item.reviewerEmail}</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center text-gray-500 py-4">
									No reviews yet. Be the first to review this product!
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductDetailPage
