const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Shipping', 'Billing'], required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  },
  { timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema);
