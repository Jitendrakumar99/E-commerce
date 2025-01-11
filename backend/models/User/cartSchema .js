const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema(
	{
	  _id: {type: mongoose.Schema.Types.ObjectId,auto: true, },
	  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
	  quantity: { type: Number, required: true },
	  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
	},
  );
  module.exports = mongoose.model('Cart', cartSchema);
  