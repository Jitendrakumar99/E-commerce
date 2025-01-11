import { useState,useEffect } from 'react';
import './App.css'
import Navbar from './component/Navbar'
import Layout from './component/Layout.jsx'
import MainCart from './component/MainCart.jsx';
import About from './component/About.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProductDetailPage from './component/ProductDetailPage';
import HomePage from './component/HomePage.jsx';
import Wishlist from './component/Wishlist.jsx';
import Login from './component/Login.jsx';
import ImageForm from './component/ImageForm.jsx';
import ProfilePage from './component/ProfilePage.jsx';
import OrderPage from './component/OrderPage.jsx';
function App() {
  
  return (
    <BrowserRouter>
    <Layout/>
    <Routes>
      <Route index element={<Login/>}/>
      <Route path='/' element={<Layout/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/Cart' element={<MainCart/>}></Route>
      <Route path='/wishlist' element={<Wishlist/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/detail' element={<ProductDetailPage/>}></Route>
      <Route path='/ImageForm' element={<ImageForm/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>
      <Route path='/order' element={<OrderPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
