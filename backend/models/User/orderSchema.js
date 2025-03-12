const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
	_id: {
	  type: mongoose.Schema.Types.ObjectId,
	  auto: true,
	},
	title: String,
	description: String,
	brand: String,
	category: String,
	price: Number,
	discountPercentage: Number,
	rating: Number,
	shippingInformation: String,
	returnPolicy: String,
	stock: Number,
	quantity: Number, 
	warrantyInformation: String,
	cartId: String,
	availabilityStatus: String,
	sku: String,
	dimensions: {
	  width: Number,
	  height: Number,
	  depth: Number,
	},
	tags: {
	  type: [String],
	  required: true,
	},
	images: {
	  type: [String],
	  required: true,
	},
  },
  { timestamps: true }
);
  module.exports = mongoose.model('Order', orderSchema);
  