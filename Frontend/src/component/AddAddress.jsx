import React, { useState } from 'react';

function AddAddress() {
  const [formData, setFormData] = useState({
    Name: '',
    Phone: '',
    Pincode: '',
    Locality: '',
    Address: '',
    City_town: '',
    State: '',
    Landmark: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send formData to your backend here using fetch or axios.
    console.log(formData);
  };

  return (
    <div className="add-address-form w-full max-w-lg mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Add New Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Pincode</label>
          <input
            type="text"
            name="Pincode"
            value={formData.Pincode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Locality</label>
          <input
            type="text"
            name="Locality"
            value={formData.Locality}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">City/Town</label>
          <input
            type="text"
            name="City_town"
            value={formData.City_town}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">State</label>
          <input
            type="text"
            name="State"
            value={formData.State}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Landmark</label>
          <input
            type="text"
            name="Landmark"
            value={formData.Landmark}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddAddress;
