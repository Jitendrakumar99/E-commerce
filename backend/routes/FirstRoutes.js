const express=require('express')
const Route=express.Router();
const ProductData=require('../Controller/ProductDataController');
const GetProduct=require('../Controller/Getdata/Products')
const updateProduct=require('../Controller/Admincontroller/updataProduct')
const deleteProduct=require('../Controller/Admincontroller/deleteProduct')
const ImageGallary=require('../Controller/Admincontroller/Imagegalarry')
const GetImagedata=require('../Controller/Admincontroller/GetImages')
Route.post('/AddProduct',ProductData.insertProduct);
Route.post('/Addreview',ProductData.reviewProduct);
Route.get('/getreview/:id',ProductData.getreviewbyid);
Route.post('/imageGallary',ImageGallary.Imagehandle);
Route.get('/getProduct',GetProduct.GetProduct);
Route.get('/getimage',GetImagedata.GetImagedata);
Route.put('/updataproduct',updateProduct.updateProduct);
Route.delete('/deleteProduct',deleteProduct.deleteProduct);
const authenticate = require('../middleware/authenticate');
const {getProductData}=require('../Controller/Admincontroller/getProductdata')
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
  removeWishList,
  clearUserCart,
  storeOrder,
  EditAddress,
  deleteAddress
} = require('../Controller/userController');


Route.post('/Auth', createUser);
Route.post('/login', loginUser);
// Route.get('Auth/:id', getAllUsers);
Route.get('/user/profile', authenticate, getUserById);
Route.put('/updateUser', authenticate, updateUser);
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
Route.get('/getalldata',getProductData);
Route.post('/clearUserCart',authenticate,clearUserCart);
Route.post('/storeOrder',authenticate,storeOrder);
Route.put('/editAddress/:id', authenticate, EditAddress);
Route.post('/deleteAddress/:id', authenticate, deleteAddress);

module.exports=Route;