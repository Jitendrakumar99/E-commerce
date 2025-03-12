const Product=require('../models/Product/ProductData');
const mongoose = require('mongoose');
const reviews=require('../models/Product/reviewsSchema')

const insertreviews=async(data)=>{
	console.log(data);
	const tagDoc = await reviews.insertMany(data);
	return tagDoc.map(doc => doc._id);
}
const insertProduct = async (req, res) => {
	console.log(req.body);
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      sku,
      weight,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      tags,
      dimensions,
      reviews,
      images,
    } = req.body;
	const reviewsIds=await insertreviews(req.body.reviews);
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      category,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      sku,
      weight,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      tags,
      images,
	  dimensions,
	  reviews:reviewsIds,
    });
    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully!',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({
      message: 'An error occurred while adding the product.',
      error: error.message,
    });
  }
};


const reviewProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const data = req.body;
    console.log('data', data);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found!',
      });
    }
    const newReview = new reviews(data);
    await newReview.save(); 
    product.reviews.push(newReview._id);
    await product.save();
    res.status(201).json({
      message: 'Review added successfully!',
      review: newReview,
    });
  }
  catch (error) {
    console.error('Error inserting review:', error);
    res.status(500).json({
      message: 'An error occurred while adding the review.',
      error: error.message,
    });
  }
}
const getreviewbyid = async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findById(productId).populate('reviews');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Review fetched successfully!',
      reviews: product.reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
};


module.exports = { insertProduct , reviewProduct,getreviewbyid};
