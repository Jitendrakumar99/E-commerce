import React from "react";
import Slider from "react-slick";
import "./SlickItem.css";
function SlickItem() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow:5, // Adjust this for your default view if needed
    centerMode: true, // This will ensure that the center slide is displayed prominently
    centerPadding: '0px', // Make sure there's no extra padding on the sides
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 0,
    arrows: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // On medium screens show 3 slides
          slidesToScroll: 1,
          centerMode: true, // Keep centering the slides
          centerPadding: '0px', // No padding
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2, // On small screens show 2 slides
          slidesToScroll: 1,
          centerMode: true, // Keep centering
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // On extra small screens, show 1 slide
          slidesToScroll: 1,
          centerMode: true, // Ensure the slide is centered
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <Slider className="slider-container flex justify-evenly items-center w-full h-full p-5" {...settings}>
     <div className="MainSlick">
        <div className="slick-image ">
          <img
            className="img"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/Img23/Budget3/REC-PC_CC_379x304._SY304_CB564096366_.jpg"
            alt=""
          />
        </div>
        <div className="CatName">Mobile-accessories</div>
      </div>
     <div className="MainSlick">
        <div className="slick-image">
          <img
            className="img"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/TVs/nikita/1/1/Samsung_Mi_PC_CC_379x304._SY304_CB562051643_.jpg"
            alt=""
          />
        </div>
        <div className="CatName">Home-decoration</div>
      </div>
     <div className="MainSlick">
        <div className="slick-image ">
          <img
            className="img"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC_3_1x._SY116_CB562243010_.jpg"
            alt=""
          />
        </div>
        <div className="CatName">Groceries</div>
      </div>
     <div className="MainSlick">
        <div className="slick-image ">
          <img
            className="img"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/OHL/Jup24/GW/PC_QC_4_1x._SY116_CB562243010_.jpg"
            alt=""
          />
        </div>
        <div className="CatName">Furniture</div>
      </div>
     <div className="MainSlick">
        <div className="slick-image ">
          <img
            className="img"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/Img23/Budget3/REC-PC_CC_379x304._SY304_CB564096366_.jpg"
            alt=""
          />
        </div>
        <div className="CatName">Skin-care</div>
      </div>
     <div className="MainSlick">
        <div className="slick-image ">
          <img
            className="img"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/Img23/Budget3/REC-PC_CC_379x304._SY304_CB564096366_.jpg"
            alt=""
          />
        </div>
        <div className="CatName">Laptop</div>
      </div>
    
    </Slider>
  );
}

export default SlickItem;
