import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SuccessMessage() {
  const [show, setShow] = useState(true);
  const navigate=useNavigate();
  const closePopup = () => {
    setShow(false);
      navigate('/')
  };

  return (
    <>
      {show && (
        <>
          {/* Background with blur effect */}
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-40"></div>
          
          {/* Popup Content */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-2xl font-semibold text-green-600">Payment Successful!</h2>
              <p className="mt-4 text-lg">
                Your payment has been successfully processed. Your product will be delivered soon.
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Delivery Update:</strong> You will receive a tracking number once your product is shipped.
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closePopup}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SuccessMessage;
