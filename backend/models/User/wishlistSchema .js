const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema(
	{
	  _id: {type: mongoose.Schema.Types.ObjectId,auto: true, },
	  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
	},
	{ timestamps: true }
  );
  
  module.exports = mongoose.model('Wishlist', wishlistSchema);
  