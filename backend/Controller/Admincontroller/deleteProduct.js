const Product=require('../../models/Product/ProductData')

exports.deleteProduct=async(req,res)=>{
	try{
       const {_id}=req.body;
	   console.log(_id);
	   
	   if(!_id) res.status(400).json({error:"no getting id"})
	  const product=await Product.findByIdAndDelete(_id)
	 if(!product) res.status(400).json({error:"product not found"});

	  res.status(200).json({message:"product deleted"})
	}
	catch(err){
		res.status(400).json({error:"error occour"})

	}
}