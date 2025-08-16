import { useState,useEffect,useContext } from 'react';
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
import { AppContext } from './context/Context.jsx';
import SuccessMessage from './component/SuccessMessage.jsx';
import Notification from './component/Notification.jsx';
function App() {
  const {WishlistItem,isOpen,setIsOpen}=useContext(AppContext);
  return (
    <BrowserRouter>
    <Layout/>
    <Notification />
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login'  element={<Login/>}/>
      {/* <Route index path='/' element={<Layout/>}></Route> */}
      <Route path='/Cart' element={<MainCart/>}></Route>
      <Route path='/wishlist' element={<Wishlist key={WishlistItem}/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/detail' element={<ProductDetailPage/>}></Route>
      <Route path='/ImageForm' element={<ImageForm/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>
      <Route path='/order' element={<OrderPage/>}></Route>
      {/* <Route path='/notification' element={<Notification/>}></Route> */}
      <Route path='/SuccessMessage' element={<SuccessMessage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
