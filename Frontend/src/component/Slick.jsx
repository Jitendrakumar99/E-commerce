import React from 'react'
import Slider from "react-slick";
import './Slick.css'
function Slick() {
	const slickimg=[
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg"},
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/2024/Cleaning_Unrec_PC__3000._CB565946710_.jpg"},
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/Aug/Skincare-PC._CB565600605_.jpg"},
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/Aug/Makeup-PC._CB565600605_.jpg"},
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/August/Unrec/BAU/21Aug/1-1._CB565867124_.jpg"},
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/harsmisc/2024/AugBAU/HI_HMD_3000_PC-FDFO._CB565898884_.jpg"},
		{url:"https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200_V3._CB558389732_.jpg"},
	  ]
	// console.log(slickimg);
	
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToScroll: 1,
		pauseOnHover:false,
		pauseOnFocus:false,
		// responsive: [
		// 	{
		// 		breakpoint: 1424, // At screens smaller than 1024px
		// 		settings: {
		// 			slidesToShow: 1,
		// 			slidesToScroll: 1,
		// 			infinite: true,
		// 			dots: true
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 924, // At screens smaller than 1024px
		// 		settings: {
		// 			slidesToShow: 1,
		// 			slidesToScroll: 1,
		// 			infinite: true,
		// 			dots: true
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 600, // At screens smaller than 600px
		// 		settings: {
		// 			slidesToShow: 1,
		// 			slidesToScroll: 1,
		// 			initialSlide: 1
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 480, // At screens smaller than 480px
		// 		settings: {
		// 			slidesToShow: 1,
		// 			slidesToScroll: 1
		// 		}
		// 	}
		// ]
	};
	
  return (
  <Slider className='slickmain'  {...settings}>

	{
		slickimg.map((val)=>
		(
		
			<div key={val.id} className='slickcard'>
             <img  src={val.url} alt="" />
			 {/* <div className="">{val.id}</div> */}
			</div>
		  
		))
	}
  </Slider>
  )
}

export default Slick
