const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    _id:{type:mongoose.Schema.Types.ObjectId,auto:true},
    address: { type: String, required: true }, // The address field
    adtype: { type: String, required: true }, // Address type (Home or Work)
    city: { type: String, required: true }, // City
    locality: { type: String, required: true }, // Locality
    name: { type: String, required: true }, // Name of the person
    phone: { type: String, required: true }, // Phone number
    pincode: { type: String, required: true }, // Pincode (Postal code)
    state: { type: String, required: true }, // State
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  },
  { timestamps: true } // Optional: Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Address', addressSchema);
