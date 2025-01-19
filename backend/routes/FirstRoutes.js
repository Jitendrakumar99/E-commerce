const express=require('express')
const Route=express.Router();
const ProductData=require('../Controller/ProductDataController');
const GetProduct=require('../Controller/Getdata/Products')
Route.post('/AddProduct',ProductData.insertProduct);
Route.get('/getProduct',GetProduct.GetProduct);
const authenticate = require('../Controller/middleware/authenticate');
const {
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
  removeWishList
} = require('../Controller/userController');


Route.post('/Auth', createUser);
Route.post('/login', loginUser);
// Route.get('Auth/:id', getAllUsers);
Route.get('/user/profile', authenticate, getUserById);
Route.put('/:id', updateUser);
Route.delete('/:id', deleteUser);
Route.post('/add-address', authenticate,addAddress);
Route.post('/add-payment-method', addPaymentMethod);
Route.post('/add-to-cart',authenticate, addToCart);
Route.post('/removeFromCart',authenticate, removeFromCart);
Route.get('/getcartdata',authenticate, getcartdata);
Route.get('/getWishListdata',authenticate, getWishListdata);
Route.post('/updataCartdata', updataCartdata);
Route.post('/add-to-wishlist',authenticate, addToWishlist);
Route.post('/remove-form-wishlist',authenticate, removeWishList);


module.exports=Route;