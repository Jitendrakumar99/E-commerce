import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdLocate } from "react-icons/io";
import { AppContext } from "../context/Context";
import { FaUserCircle, FaRegHeart, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaCheck, FaTruck, FaBox, FaClock, FaTrash } from "react-icons/fa";
import { MdVerified, MdEmail, MdPhone, MdEdit } from "react-icons/md";
import axios from "axios";
import "./ProfilePage.css";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const { add_address, UserData, Url, updateAddressInContext, deleteAddressFromContext } = useContext(AppContext);
  const [OpenFrom, setOpenFrom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [filteredTime, setFilteredTime] = useState('All');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "",
    Email: "",
    Phone: ""
  });

  const [addressdata, setAddressdata] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    adtype: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${Url}user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [Url]);

  useEffect(() => {
    if (userData) {
      setProfileData({
        displayName: userData.displayName || "",
        Email: userData.Email || "",
        Phone: userData.Phone || ""
      });
    }
  }, [userData]);

  const getdata = (Event) => {
    const { name, value } = Event.target;
    setAddressdata((prev) => ({ 
      ...prev, 
      [name]: value === '' ? '' : value 
    }));
  };

  const fetchLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD1DWK-UIhFPH8yLOiLFgRPEqaGQDCQANE`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const details = data.results[0].components;
            setAddressdata((prev) => ({
              ...prev,
              locality: details.suburb || "",
              city: details.city || details.town || details.village || "",
              state: details.state || "",
              pincode: details.postcode || "",
              address: data.results[0].formatted || "",
            }));
          } else {
            alert("Could not fetch location details.");
          }
        } catch (error) {
          alert("An error occurred while fetching location details.");
          console.error(error);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location permission denied. Please allow access to use this feature.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert("Location information is unavailable.");
        } else if (error.code === error.TIMEOUT) {
          alert("The request to get user location timed out.");
        } else {
          alert("An unknown error occurred.");
        }
        console.error(error);
      }
    );
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressdata({
      name: address.name,
      phone: address.phone,
      pincode: address.pincode,
      locality: address.locality,
      address: address.address,
      city: address.city,
      state: address.state,
      adtype: address.adtype,
    });
    setOpenFrom(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to delete address");
        return;
      }

      await axios.post(`${Url}deleteAddress/${addressId}`, 
        {},  // empty body since we're passing id in URL
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update both local and context state
      deleteAddressFromContext(addressId);
      setUserData(prevData => ({
        ...prevData,
        Address: prevData.Address.filter(addr => addr._id !== addressId)
      }));
      
      setMenuOpenId(null);
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  const handleUpdateAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update address");
        return;
      }

      if (!editingAddress?._id) {
        toast.error("Invalid address data");
        return;
      }

      // Validate required fields
      if (!addressdata.name || !addressdata.phone || !addressdata.address || !addressdata.city || !addressdata.state || !addressdata.pincode) {
        toast.error("Please fill all required fields");
        return;
      }

      const response = await axios.put(`${Url}editAddress/${editingAddress._id}`, 
        { addressdata },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update both local and context state
      updateAddressInContext(editingAddress._id, addressdata);
      setUserData(prevData => ({
        ...prevData,
        Address: prevData.Address.map(addr => 
          addr._id === editingAddress._id 
            ? { ...addr, ...addressdata }
            : addr
        )
      }));
      
      setEditingAddress(null);
      setOpenFrom(false);
      setAddressdata({
        name: "",
        phone: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        adtype: "",
      });
      toast.success("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error(error.response?.data?.message || "Failed to update address");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update profile");
        return;
      }

      // Validate the data
      if (!profileData.displayName.trim()) {
        toast.error("Name cannot be empty");
        return;
      }

      const updatedData = {
        displayName: profileData.displayName.trim(),
        Phone: profileData.Phone ? profileData.Phone.trim() : ""
      };

      // Use the new updateUser endpoint
      await axios.put(`${Url}updateUser`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh user data
      const response = await axios.get(`${Url}user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
      setEditingProfile(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const SubmitHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add address");
        return;
      }

      // Validate required fields
      if (!addressdata.name || !addressdata.phone || !addressdata.address || !addressdata.city || !addressdata.state || !addressdata.pincode || !addressdata.adtype) {
        toast.error("Please fill all required fields including address type");
        return;
      }

      if (editingAddress) {
        await handleUpdateAddress();
      } else {
        // Add new address
        const response = await axios.post(
          `${Url}add-address`,
          { addressdata },  // Send addressdata wrapped in an object
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.success) {
          // Update both local and context state
          const newAddress = response.data.address;
          
          setUserData(prevData => ({
            ...prevData,
            Address: [...(prevData?.Address || []), newAddress]
          }));

          // Reset form
          setAddressdata({
            name: "",
            phone: "",
            pincode: "",
            locality: "",
            address: "",
            city: "",
            state: "",
            adtype: "",
          });
          
          setOpenFrom(false);
          toast.success("Address added successfully");
          
          // Refresh user data to ensure we have the latest state
          const updatedUserResponse = await axios.get(`${Url}user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(updatedUserResponse.data);
        } else {
          toast.success(response.data.message || "Failed to add address");
        }
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(error.response?.data?.message || "Failed to add address");
    }
  };

  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Profile Stats
  const stats = [
    { label: "Orders", value: userData?.orderHistory?.length || 0, icon: FaShoppingBag },
    { label: "Wishlist", value: userData?.WishList?.length || 0, icon: FaRegHeart },
    { label: "Addresses", value: userData?.Address?.length || 0, icon: FaMapMarkerAlt },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheck className="w-5 h-5" />;
      case 'Shipped':
        return <FaTruck className="w-5 h-5" />;
      case 'Processing':
        return <FaBox className="w-5 h-5" />;
      default:
        return <FaClock className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md md:h-screen p-4 md:p-6 md:sticky md:top-0">
        <div className="flex items-center space-x-4 mb-8">
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt="Profile" className="w-12 h-12 rounded-full" />
          ) : (
            <FaUserCircle className="w-12 h-12 text-gray-400" />
          )}
          <div>
            <h2 className="text-lg font-semibold">{userData?.displayName||userData?.FirstName}</h2>
            {userData?.isVerified && (
              <div className="flex items-center text-green-600 text-sm">
                <MdVerified className="mr-1" /> Verified
              </div>
            )}
          </div>
        </div>

        <nav className="flex md:block overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-2 pb-4 md:pb-0">
          <button
            onClick={() => handleSectionChange("profile")}
            className={`whitespace-nowrap md:w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 ${
              activeSection === "profile"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaUserCircle />
            <span>Profile</span>
          </button>

          <button
            onClick={() => handleSectionChange("orders")}
            className={`whitespace-nowrap md:w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 ${
              activeSection === "orders"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaShoppingBag />
            <span>Orders</span>
          </button>

          <button
            onClick={() => handleSectionChange("address")}
            className={`whitespace-nowrap md:w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 ${
              activeSection === "address"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaMapMarkerAlt />
            <span>Addresses</span>
          </button>

          <button
            onClick={() => handleSectionChange("payment")}
            className={`whitespace-nowrap md:w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 ${
              activeSection === "payment"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaCreditCard />
            <span>Payment Methods</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <button 
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <MdEdit className="mr-2" /> {editingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-lg">{userData?.displayName||userData.FirstName+" "+userData.LastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <div className="flex items-center mt-1">
                    {editingProfile ? (
                      <input
                        type="email"
                        value={profileData.Email}
                        readOnly={true}
                        onChange={() => {}}
                        className="w-full p-2 bg-gray-100 border rounded-lg cursor-not-allowed"
                      />
                    ) : (
                      <>
                        <p className="text-lg">{userData?.Email}</p>
                        {userData?.isVerified && (
                          <MdVerified className="ml-2 text-green-500" />
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  {editingProfile ? (
                    <input
                      type="tel"
                      value={profileData.Phone}
                      onChange={(e) => setProfileData({...profileData, Phone: e.target.value})}
                      className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-lg">{userData?.Phone || "Not added"}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Member Since</label>
                  <p className="mt-1 text-lg">
                    {new Date(userData?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {editingProfile && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setEditingProfile(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className="text-3xl text-blue-600" />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {userData?.orderHistory?.slice(0, 3).map((order, index) => (
                  <div key={index} className="flex items-center space-x-4 border-b pb-4">
                    <img
                      src={order.images[0]}
                      alt={order.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{order.title}</p>
                      <p className="text-gray-500">
                        Ordered on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-bold">${order.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {activeSection === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters and Stats */}
              <div className="w-full lg:w-1/4 space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-medium text-gray-700 mb-4">Filter Orders</h3>
                  
                  {/* Status Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Order Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filteredStatus}
                      onChange={(e) => setFilteredStatus(e.target.value)}
                    >
                      <option value="All">All Orders</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Order Date
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filteredTime}
                      onChange={(e) => setFilteredTime(e.target.value)}
                    >
                      <option value="All">All Dates</option>
                      {userData?.orderHistory?.map(order => {
                        const date = format(new Date(order.createdAt), 'yyyy-MM-dd');
                        return (
                          <option key={date} value={date}>
                            {format(new Date(date), 'MMM dd, yyyy')}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Order Statistics */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-medium text-gray-700 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Orders</span>
                      <span className="font-semibold">{userData?.orderHistory?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Delivered</span>
                      <span className="font-semibold">
                        {userData?.orderHistory?.filter(o => o.status === 'Delivered').length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">In Transit</span>
                      <span className="font-semibold">
                        {userData?.orderHistory?.filter(o => o.status === 'Shipped').length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="w-full lg:w-3/4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Your Orders</h2>
                    <p className="text-gray-600">
                      Showing {userData?.orderHistory?.length || 0} orders
                    </p>
                  </div>

                  {!userData?.orderHistory?.length ? (
                    <div className="text-center py-12">
                      <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No orders found</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userData?.orderHistory?.map((order) => (
                        <div key={order._id} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Order ID</p>
                              <p className="font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                            </div>
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="font-medium">{order.status}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <img
                              src={order.images[0]}
                              alt={order.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{order.title}</h3>
                              <p className="text-gray-600">Brand: {order.brand}</p>
                              <p className="text-gray-600">Quantity: {order.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">${order.price}</p>
                              {order.discountPercentage > 0 && (
                                <p className="text-green-600 text-sm">
                                  {order.discountPercentage}% OFF
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4 text-sm">
                            <div className="text-gray-500">
                              Ordered on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                            </div>
                            <div className="space-x-4">
                              <button className="text-blue-600 hover:text-blue-700 font-medium">
                                Track Order
                              </button>
                              <button className="text-blue-600 hover:text-blue-700 font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Address Section */}
        {activeSection === "address" && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Manage Addresses
            </h2>
            
            {/* Add Address Button */}
            <div className="Addaddress border-gray-300 border-2 h-16 p-1 tracking-widest flex letter items-center mb-5">
              <div onClick={() => setOpenFrom(!OpenFrom)} className="Add text-blue-800 cursor-pointer w-full text-center md:text-left">
                <span className="text-3xl text-center">+</span> ADD NEW ADDRESS
              </div>
            </div>

            {/* Address Form */}
            {OpenFrom && (
              <div className="bg-[#F5FAFF] p-4 md:p-5 flex flex-col gap-4 md:gap-5 border mb-8">
                <div className="text-blue-800">ADD A NEW ADDRESS</div>
                
                {/* Location Button */}
                <div
                  onClick={fetchLocation}
                  className="bg-[#2874F0] w-full md:w-[200px] p-2 flex flex-row items-center justify-center md:justify-start text-white cursor-pointer"
                >
                  <IoMdLocate className="mr-2" />
                  Use My current location
                </div>

                {/* Form Fields */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                  <input
                    className="pl-2 border rounded p-2 w-full"
                    onChange={getdata}
                    type="text"
                    name="name"
                    value={addressdata.name || ''}
                    placeholder="Name"
                  />
                  <input
                    className="pl-2 border rounded p-2 w-full"
                    onChange={getdata}
                    type="number"
                    name="phone"
                    value={addressdata.phone || ''}
                    placeholder="Phone"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                  <input
                    className="pl-2 border rounded p-2 w-full"
                    onChange={getdata}
                    type="number"
                    name="pincode"
                    value={addressdata.pincode || ''}
                    placeholder="Pincode"
                  />
                  <input
                    className="pl-2 border rounded p-2 w-full"
                    onChange={getdata}
                    type="text"
                    name="locality"
                    value={addressdata.locality || ''}
                    placeholder="Locality"
                  />
                </div>

                <div className="h-20 flex">
                  <input
                    className="Address pl-2 border rounded p-2 w-full"
                    type="text"
                    name="address"
                    value={addressdata.address || ''}
                    onChange={getdata}
                    placeholder="Address"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                  <input
                    className="pl-2 border rounded p-2 w-full"
                    onChange={getdata}
                    type="text"
                    name="city"
                    value={addressdata.city || ''}
                    placeholder="City/town"
                  />
                  <select
                    name="state"
                    value={addressdata.state || ''}
                    onChange={getdata}
                    className="w-full md:w-[200px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                    <option value="assam">Assam</option>
                    <option value="bihar">Bihar</option>
                    <option value="chhattisgarh">Chhattisgarh</option>
                    <option value="goa">Goa</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="haryana">Haryana</option>
                    <option value="himachal-pradesh">Himachal Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="mizoram">Mizoram</option>
                    <option value="nagaland">Nagaland</option>
                    <option value="odisha">Odisha</option>
                    <option value="punjab">Punjab</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="sikkim">Sikkim</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="telangana">Telangana</option>
                    <option value="tripura">Tripura</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="west-bengal">West Bengal</option>
                    <option value="andaman-nicobar">Andaman and Nicobar Islands</option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="dadra-nagar-haveli-daman-diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="delhi">Delhi</option>
                    <option value="jammu-kashmir">Jammu and Kashmir</option>
                    <option value="ladakh">Ladakh</option>
                    <option value="lakshadweep">Lakshadweep</option>
                    <option value="puducherry">Puducherry</option>
                  </select>
                </div>

                {/* Address Type */}
                <div>
                  <div className="mb-2">Address Type</div>
                  <div className="radioinputmain flex gap-5">
                    <div className="flex gap-2 items-center">
                      <input
                        className="radioinput"
                        id="home"
                        type="radio"
                        name="adtype"
                        value="Home"
                        checked={addressdata.adtype === "Home"}
                        onChange={getdata}
                      />
                      <label htmlFor="home">Home</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        className="radioinput"
                        id="work"
                        type="radio"
                        name="adtype"
                        value="Work"
                        checked={addressdata.adtype === "Work"}
                        onChange={getdata}
                      />
                      <label htmlFor="work">Work</label>
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col md:flex-row gap-2">
                  <div
                    onClick={SubmitHandler}
                    className="w-full md:w-40 bg-blue-500 h-10 text-center p-2 cursor-pointer text-white rounded"
                  >
                    Save
                  </div>
                  <div 
                    onClick={() => setOpenFrom(false)}
                    className="w-full md:w-40 text-blue-500 h-10 text-center p-2 cursor-pointer border border-blue-500 rounded"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            )}

            {/* Address List */}
            <div className="flex flex-col gap-4 md:gap-5">
              {UserData?.Address?.map((data, index) => (
                <div
                  key={data._id || index}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data.adtype === 'Home' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {data.adtype}
                      </span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === data._id ? null : data._id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <HiDotsVertical className="w-5 h-5 text-gray-500" />
                      </button>
                      {menuOpenId === data._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                handleEditAddress(data);
                                setMenuOpenId(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <MdEdit className="mr-2" /> Edit Address
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteAddress(data._id);
                                setMenuOpenId(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                              <FaTrash className="mr-2" /> Delete Address
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="font-medium text-lg">{data.name}</p>
                    <p className="text-gray-600">{data.phone}</p>
                    <p className="text-gray-600 mt-2">
                      {data.address}, {data.locality}, {data.city}, {data.state} - {data.pincode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Methods Section */}
        {activeSection === "payment" && (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Payment Method
              </button>
            </div>

            {userData?.PaymentMethod.length === 0 ? (
              <p className="text-gray-500">No payment methods saved yet.</p>
            ) : (
              <div className="space-y-4">
                {userData?.PaymentMethod.map((method, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {/* Add payment method details here */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
