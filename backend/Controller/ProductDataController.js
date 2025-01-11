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

module.exports = { insertProduct };
