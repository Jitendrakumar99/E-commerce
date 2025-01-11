import React, { useContext } from 'react';
import './Banner.css'; // Import the CSS file
import { AppContext } from '../context/Context';
const Banner = () => {
  const {counter}=useContext(AppContext)
  // console.log(counter);
  
  return (
    <div className="banner z-40">
       
      <div className="banner-text">See The Oncoming Offer</div>
      <div className="banner-content">
       <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IN-Events/Arundhati/J24_PC_Teaser_Header_Unrec_Prime_R1.jpg" alt="" />
      </div>
    </div>
  );
};

export default Banner;
