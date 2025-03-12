const mongoose=require('mongoose');
const ProductData=new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		auto: true, 
	  },
	title:{
		type:String,
	},
	description:
	{
		type:String,
	},
	category:
	{
		type:String,
	},
	price:
	{
		type:Number,
	},
	discountPercentage:
	{
		type:Number,
	},
	rating:
	{
		type:Number,
	},
	stock:
	{
		type:Number,
	},
	brand:
	{
		type:String,
	},
	sku:
	{
		type:String,
	},
	weight:
	{
		type:Number,
	},
	warrantyInformation:
	{
		type:String,
	},
	shippingInformation:
	{
		type:String,
	},
	availabilityStatus:
	{
		type:String,
	},
	returnPolicy:
	{
		type:String,
	},
	tags:{
		type:[String],
		required:true
	},
	dimensions: {
		width: { type: Number, required: true },
		height: { type: Number, required: true },
		depth: { type: Number, required: true },
	  },
	reviews:[{type:mongoose.Schema.Types.ObjectId, ref: 'Review'}],
	images:{
		type:[String],
		required:true
	}
}
,
{ timestamps: true })

module.exports= mongoose.model('Product', ProductData);
  
