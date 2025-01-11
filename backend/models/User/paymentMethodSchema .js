const mongoose = require('mongoose');
const paymentMethodSchema = new mongoose.Schema(
	{
	  type: { type: String, required: true },
	  last4: { type: String },
	  expiry: { type: String },
	  billingAddress: {
		addressLine1: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		postalCode: { type: String, required: true },
		country: { type: String, required: true },
	  },
	  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
	},
	{ timestamps: true }
  );
  
  module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
  