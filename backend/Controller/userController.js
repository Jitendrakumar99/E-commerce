const User = require("../models/User/MainUserSchema");
const bcrypt = require("bcrypt");
const Cart = require("../models/User/cartSchema ");
const WishList=require('../models/User/wishlistSchema ')
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Product = require("../models/Product/ProductData");
const Address=require('../models/User/Address');
const OrderListData=require('../models/User/orderSchema')
const { userInfo } = require("os");
require("dotenv").config();
const createUser = async (req, res) => {
  try {
    const { Email, Password, confirmpassword, Phone, FirstName, LastName, uid, photoURL, lastLoginAt } = req.body;
    let { displayName } = req.body;

    console.log("Received Signup Request:", req.body);

    if (!displayName) {
      displayName = `${FirstName} ${LastName}`;
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    /** Google Signup (Has `uid`) **/
    if (uid) {
      const existingUser = await User.findOne({
        $or: [{ Email: Email.toLowerCase() }, { uid }],
      });

      if (existingUser) {
        existingUser.lastLoginAt = lastLoginAt;
        await existingUser.save();

        const token = jwt.sign(
          { userId: existingUser._id, email: existingUser.Email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({ 
          message: "User exists", 
          user: existingUser, 
          token 
        });
      }

      const googleUser = new User({
        Email: Email.toLowerCase(),
        FirstName,
        LastName,
        displayName,
        photoURL,
        uid,
        lastLoginAt,
        isVerified: true,
        Password: `google-auth-${uid}`,
      });

      await googleUser.save();

      const token = jwt.sign(
        { userId: googleUser._id, email: googleUser.Email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({ 
        message: "Google user created successfully", 
        user: googleUser, 
        token 
      });
    }

    /** Regular Signup (No `uid`) **/
    if (!FirstName || !Email || !Password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (Password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ Email: Email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      Email: Email.toLowerCase(),
      Password: hashedPassword,
      FirstName,
      LastName,
      Phone: Phone || null,
      displayName,
      uid: null  // Set to null for regular signup
    });

    await newUser.save();

    // Generate token for regular signup
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.Email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ 
      message: "User created successfully", 
      user: newUser,
      token 
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};



const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  const JWT_SECRET = await process.env.JWT_SECRET;
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      console.log("User not found with Email:", Email);
      return res.status(404).json({ message: "User not found." });
    }
    console.log("Found User:", user);

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      console.log("Password mismatch for Email:", Email);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log("User authenticated. Generating token...");
    const token = jwt.sign(
      { userId: user._id, email: user.Email, _id: user._id },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("Token generated:", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("Address")
      .populate("PaymentMethod")
      .populate("orderHistory")
      .populate("Cart")
      .populate("WishList");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.user);
    const user = await User.findById(userId)
      .populate({path:'Address'})
      // .populate({path:'PaymentMethod'})
      .populate({path:'orderHistory'})
      .populate({ path: "Cart" })
      .populate({path:'WishList'});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Send the user data as a response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from authenticated request
    const updates = req.body;

    // Validate the updates
    if (!updates.displayName && !updates.Phone) {
      return res.status(400).json({ message: "No valid update fields provided" });
    }

    // Find and update the user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user 
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ 
      message: "Error updating profile", 
      error: error.message 
    });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
const addAddress = async (req, res) => {
  const { name, phone, pincode, locality, address, city, state, adtype } = req.body.addressdata;
  const userId=req.user.userId;

  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newaddress=new Address({
      name,
      phone,
      pincode,
      locality,
      address,
      city,
      state,
      adtype,
      userId:user._id
    })
    newaddress.save();
    user.Address.push(newaddress._id);
    await user.save();
    res.status(200).json({ message: "Address added to user", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding address", error: error.message });
  }
};
const EditAddress = async (req, res) => {
  try {
    const { name, phone, pincode, locality, address, city, state, adtype } = req.body.addressdata;
    const userId = req.user.userId;
    const addressId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the address belongs to the user
    if (!user.Address.includes(addressId)) {
      return res.status(403).json({ message: "Not authorized to edit this address" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      {
        name,
        phone,
        pincode,
        locality,
        address,
        city,
        state,
        adtype
      },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ 
      message: "Address updated successfully", 
      address: updatedAddress 
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ 
      message: "Error updating address", 
      error: error.message 
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the address belongs to the user
    if (!user.Address.includes(addressId)) {
      return res.status(403).json({ message: "Not authorized to delete this address" });
    }

    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Remove the address from user's addresses array
    user.Address = user.Address.filter(id => id.toString() !== addressId);
    await user.save();

    res.status(200).json({ 
      message: "Address deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ 
      message: "Failed to delete address", 
      error: error.message 
    });
  }
};





const addPaymentMethod = async (req, res) => {
  const { userId, paymentMethodId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.PaymentMethod.push(paymentMethodId);
    await user.save();
    res.status(200).json({ message: "Payment method added to user", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding payment method", error: error.message });
  }
};
const addToCart = async (req, res) => {
  const { quantity, productId } = req.body;
  const userId = req.user.userId;
  // console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = new Cart({
      userId: userId,
      quantity,
      productId,
    });
    await cart.save();
    user.Cart.push(cart._id);
    await user.save();
    res.status(200).json({ message: "Item added to cart", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(req.body); 
    const { userId } = req.user; 
    const cartItem = await Cart.findOneAndDelete({ productId, userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    const user = await User.findById(userId);
    if (user) {
      user.Cart = user.Cart.filter(
        (cartId) => cartId.toString() !== cartItem._id.toString()
      );
      await user.save(); 
    }
    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res
      .status(500)
      .json({
        message: "Failed to remove item from cart",
        error: error.message,
      });
  }
};
const getcartdata = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch only necessary fields from the Product collection
    const products = await Product.find()
      // .select("_id title price images reviews")
      .populate({ path: "reviews" })
      .lean();

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products found" });
    }

    // Create a Map for faster product lookup
    const productMap = new Map(products.map((product) => [product._id.toString(), product]));

    // Fetch the user's cart data with necessary fields
    const user = await User.findById(userId)
      .select("Cart")
      .populate({ path: "Cart", select: "productId quantity" })
      .lean();

    if (!user || !user.Cart) {
      return res.status(400).json({ message: "User not found or cart is empty" });
    }

    // Enrich cart items with product data
    const enrichedData = user.Cart.map((cartItem) => {
      const product = productMap.get(cartItem.productId.toString());
      if (product) {
        return {
          ...product,
          quantity: cartItem.quantity,
          cartId: cartItem._id,
        };
      }
      return null;
    }).filter((item) => item !== null); // Remove null values

    // Send enriched cart data
    res.status(200).json(enrichedData);
  } catch (error) {
    console.error("Error fetching cart data:", error.message);
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
};

const updataCartdata = async (req, res) => {
	try {
	  const { cartId, quantity } = req.body;
        console.log(req.body);
		
	  // Check if the required fields are provided
	  if (!cartId || quantity == null) {
		return res.status(400).json({ message: "Cart ID and quantity are required" });
	  }
  
	  // Update the cart item
	  const updatedCart = await Cart.findOneAndUpdate(
		{ _id: cartId },                  // Filter
		{ $set: { quantity: quantity } }, // Update
		{ new: true }                     // Options: return the updated document
	  );
  
	  // If no cart item is found, handle it
	  if (!updatedCart) {
		return res.status(404).json({ message: "Cart item not found" });
	  }
  
	  // Respond with the updated cart item
	  res.status(200).json({
		message: "Cart updated successfully",
		data: updatedCart,
	  });
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: "Internal server error", error: err.message });
	}
};
const addToWishlist = async (req, res) => {
  const {productId } = req.body;
  const userId=req.user.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wish=new WishList({
      productId
    })
    await wish.save();
    user.WishList.push(wish._id);
    await user.save();
    res.status(200).json({ message: "Product added to wishlist", user });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error adding product to wishlist",
        error: error.message,
      });
  }
};
const getWishListdata = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch the user and populate their Wishlist
    const user = await User.findById(userId).populate({
      path: 'WishList',
      populate: { path: 'productId', model: 'Product' }, 
    });

    if (!user) return res.status(404).json({ message: 'User not found' });


    const wishListData = user.WishList.map((wishItem) => {
      const product = wishItem.productId; 
      return {
        wishlistId: wishItem._id,
        ...product.toObject()
      };
    });

    res.status(200).json(wishListData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const removeWishList =async(req,res)=>{
  try{
       const userId=req.user.userId;
       const {wishlistId}=req.body;
       console.log('user',userId);
       console.log('wish',wishlistId);
       const user=await User.findById(userId);
       if(!user) res.status(500).json({message:"user not found"});
       const wish=await WishList.findByIdAndDelete(wishlistId);
       if(!wish) res.status(500).json({message:"wishList not found"});
       user.WishList = user.WishList.filter((data) => data._id.toString() !== wishlistId);
      user.save();
      res.status(200).json;
  }
  catch(err){
   res.status(500).json({message:"not found"});
  }
}

const clearUserCart = async (req, res) => {
  try {
    const userId = req.user.userId; 
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }
    console.log('yes fined');

    console.log("Clearing cart for user:", userId);

    await User.findByIdAndUpdate(userId, { $set: { Cart: [] } });

    console.log("Cart cleared successfully");
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({ error: "Failed to clear cart" });
  }
};

const storeOrder = async (req, res) => {
  try {
    const {product} = req.body;
    console.log("orderdate",product);
    
    const userId = req.user.userId; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!product || Object.keys(product).length === 0) {
      return res.status(400).json({ error: "Order data is required" });
    }

    const newOrder = new OrderListData({
      title: product.title,
      description: product.description,
      brand: product.brand,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      shippingInformation: product.shippingInformation,
      returnPolicy: product.returnPolicy,
      stock: product.stock,
      quantity: product.quantity,
      warrantyInformation: product.warrantyInformation,
      cartId: product.cartId,
      availabilityStatus: product.availabilityStatus,
      sku: product.sku,
      dimensions: product.dimensions,
      tags: product.tags,
      images: product.images,
    });

    await newOrder.save();
    user.orderHistory.push(newOrder._id);
    await user.save();
    return res.status(200).json({ message: "Order stored successfully", newOrder });
  } catch (error) {
    console.error("Error storing order:", error);
    return res.status(500).json({ error: "Failed to store order" });
  }
};




module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAddress,
  addPaymentMethod,
  addToCart,
  removeFromCart,
  addToWishlist,
  loginUser,
  getcartdata,
  updataCartdata,
  getWishListdata,
  removeWishList,
  clearUserCart,
  storeOrder,
  EditAddress,
  deleteAddress
};
