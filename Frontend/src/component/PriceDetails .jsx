import React, { useState } from 'react';

const PriceDetails = () => {
  return (
    <div className="relative inline-block left-[-45px]">
		 <div className="triangle absolute w-5 h-5 top-[20px] left-4 bg-white rotate-[135deg]  border border-gray-300 "></div>
        <div className="message absolute top-6 left-[-20px] bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-72 text-sm z-10">
          <p className="font-bold">Price details</p>
          <p>Maximum Retail Price: <s>₹19999.00</s></p>
          <p>Selling Price: <s>₹15999.00</s></p>
          <p>Special Price: ₹14999.00</p>
          <p className="text-green-600 font-bold">
            Overall you save ₹5000 (25%) on this product
          </p>

          {/* Arrow at the top of the tooltip */}
         
        </div>
    </div>
  );
};

export default PriceDetails;
