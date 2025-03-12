const mongoose=require('mongoose');

const ReviewSchema = new mongoose.Schema({
	rating: {
	  type: Number,
	  required: true,
	  min: 1,
	  max: 5 
	},
	comment: {
	  type: String,
	  required: true
	},
	date: {
	  type: Date,
	  required: true,
	  default: Date.now
	},
	reviewerName: {
	  type: String,
	  required: true
	},
	reviewerEmail: {
	  type: String,
	  required: true,
	}
  });
module.exports=mongoose.model('Review',ReviewSchema)