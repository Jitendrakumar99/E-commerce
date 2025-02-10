const mongoose=require('mongoose')
const ImageSchema=new mongoose.Schema({
	_id: {
			type: mongoose.Schema.Types.ObjectId,
			auto: true, 
		  },
	images:{
		type:String,
		required:true
	}
})
module.exports=mongoose.model('ImageGallary',ImageSchema)