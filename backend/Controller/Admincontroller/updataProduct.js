const mongoose=require('mongoose')
const Product = require('../../models/Product/ProductData');
exports.updateProduct=async(req,res)=>{
  try{
	const { _id, ...updateData } = req.body;
	console.log(updateData);
	console.log(_id);
	if (!_id) {
		return res.status(400).json({ error: 'Product ID (_id) is required' });
	  }
	const product=await Product.findOneAndUpdate(
		{_id},
		{$set:updateData},
		{new:true},
	)
	if (!product) {
		return res.status(404).json({ error: 'Product not found' });
	  }
	  res.status(200).json({ message: 'Product updated successfully', product });
	
  }
  catch(err){
    res.status(500).json({ error: 'An error occurred while updating the product', details: err.message });
  }
}