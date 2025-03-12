import React, { useContext } from 'react'
import './HomePage.css'
import Product from './Product';
import Slick from './Slick'
import SlickItem from './SlickItem';
import { AppContext } from '../context/Context';
function HomePage() {
	const {cartItems}=useContext(AppContext);
 return (
	<div className='Home'>
		<Slick/>
		<div className="">
        <SlickItem/>
		</div>
	  	<Product key={cartItems}/>
	</div>
  )
}

export default HomePage
