const {mongoose,Schema}=require('mongoose')
const MainUserSchema=new mongoose.Schema({
	_id: {
		    type: mongoose.Schema.Types.ObjectId,
			auto: true, 
		  },
	FirstName:{
		type:String,
		// required:true
	},
	LastName:{
		type:String,
		// required:true
	},
	Email:{
		type:String,
		required:true,
		unique:true
	},
	Password:{
		type:String,
		// required:true
	},
	Phone:{
		type:Number,
		
	},
	// Google User Data
	displayName: {
		type: String,
		
	},
	photoURL: {
		type: String,
		
	},
	uid: { 
		type: String,
		sparse: true,
		
	},
	lastLoginAt: {
		type: Date,
	},
	Address:[{ type:mongoose.Schema.Types.ObjectId, ref: 'Address' }],
	PaymentMethod :[{ type:mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' }],
	orderHistory :[{ type:mongoose.Schema.Types.ObjectId, ref: 'Order' }],
	Cart: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
	WishList: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }],
	isVerified: { type: Boolean, default: false },
},
{ timestamps: true }
)
module.exports=mongoose.model("User",MainUserSchema);
