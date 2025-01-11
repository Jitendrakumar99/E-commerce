import React, { useState } from 'react';
import { FaLock, FaShoppingCart, FaCreditCard } from 'react-icons/fa';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    differentBilling: false,
    billingAddress: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.trim() === '' ? 'Name is required' : '';
        break;
      case 'address':
        error = value.trim() === '' ? 'Address is required' : '';
        break;
      case 'city':
        error = value.trim() === '' ? 'City is required' : '';
        break;
      case 'state':
        error = value.trim() === '' ? 'State is required' : '';
        break;
      case 'zipCode':
        error = !/^\d{5}(-\d{4})?$/.test(value) ? 'Invalid ZIP code' : '';
        break;
      case 'country':
        error = value === '' ? 'Please select a country' : '';
        break;
      case 'cardNumber':
        error = !/^\d{16}$/.test(value) ? 'Invalid card number' : '';
        break;
      case 'expirationDate':
        error = !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? 'Invalid expiration date (MM/YY)' : '';
        break;
      case 'cvv':
        error = !/^\d{3,4}$/.test(value) ? 'Invalid CVV' : '';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform final validation and submit logic here
    console.log('Form submitted:', formData);
  };

  const items = [
    { name: 'Product 1', quantity: 2, price: 19.99 },
    { name: 'Product 2', quantity: 1, price: 29.99 },
    { name: 'Product 3', quantity: 3, price: 9.99 },
  ];

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <FaShoppingCart className="h-14 w-14 text-cyan-500" />
              <h1 className="text-2xl font-semibold">Checkout</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Full Name"
                    aria-label="Full Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Street Address"
                    aria-label="Street Address"
                  />
                  {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <label className="leading-loose">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="City"
                      aria-label="City"
                    />
                    {errors.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
                  </div>
                  <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                    <label className="leading-loose">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="State"
                      aria-label="State"
                    />
                    {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <label className="leading-loose">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="ZIP Code"
                      aria-label="ZIP Code"
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs italic">{errors.zipCode}</p>}
                  </div>
                  <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                    <label className="leading-loose">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      aria-label="Country"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      {/* Add more countries as needed */}
                    </select>
                    {errors.country && <p className="text-red-500 text-xs italic">{errors.country}</p>}
                  </div>
                </div>
              </div>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-4">
                  <FaCreditCard className="h-6 w-6 text-cyan-500" />
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="1234 5678 9012 3456"
                    aria-label="Card Number"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs italic">{errors.cardNumber}</p>}
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <label className="leading-loose">Expiration Date</label>
                    <input
                      type="text"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="MM/YY"
                      aria-label="Expiration Date"
                    />
                    {errors.expirationDate && <p className="text-red-500 text-xs italic">{errors.expirationDate}</p>}
                  </div>
                  <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                    <label className="leading-loose">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="123"
                      aria-label="CVV"
                    />
                    {errors.cvv && <p className="text-red-500 text-xs italic">{errors.cvv}</p>}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="differentBilling"
                    checked={formData.differentBilling}
                    onChange={handleChange}
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-gray-300 rounded"
                    aria-label="Different billing address"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Billing address is different from shipping address
                  </label>
                </div>
                {formData.differentBilling && (
                  <div className="flex flex-col">
                    <label className="leading-loose">Billing Address</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Billing Address"
                      aria-label="Billing Address"
                    />
                  </div>
                )}
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-cyan-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  <FaLock className="mr-2" />
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;