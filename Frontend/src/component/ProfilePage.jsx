import React, { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdLocate } from "react-icons/io";
import { AppContext } from "../context/Context";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./ProfilePage.css";
function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [Showedit, setShowedit] = useState(false);
  const { add_address, UserData } = useContext(AppContext);
  const [OpenFrom,setOpenFrom]=useState(false);
  // console.log(UserData.Address[0]);

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
  const navigate = useNavigate();
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const handleSectionOrder = (section) => {
    navigate("/order");
  };
  const Show_edit_delete = () => {
    setShowedit(true);
  };
  const Show_edit = () => {
    setShowedit(false);
  };
  const getdata = (Event) => {
    const { name, value } = Event.target;
    setAddressdata((prev) => ({ ...prev, [name]: value }));
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
          console.log(data);
          // api_key : 882d7975a95d4d6d96760a80afbdfee1
          console.log(data);

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
          alert(
            "Location permission denied. Please allow access to use this feature."
          );
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

  const SubmitHandler = () => {
    const token = localStorage.getItem("token");
    add_address(addressdata, token);
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const name = localStorage.getItem("username");
  // const [name, setName] = useState("Jitendra Kumar");
  const [email, setEmail] = useState("jitendrsharma@gmail.com");
  const [phone, setPhone] = useState("6299607595");
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 h-screen p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Account
        </h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleSectionChange("profile")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionOrder("orders")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "orders"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionChange("address")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "address"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Manage Addresses
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionChange("payment")}
              className={`w-full text-left py-2 px-4 rounded-md ${
                activeSection === "payment"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              Payment Methods
            </button>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Profile Section */}
        {activeSection === "profile" && (
           <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
           <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
             Profile Details
           </h2>
     
           {/* Profile Image Upload */}
           <div className="flex flex-col items-center mb-4">
             <label htmlFor="profileImageUpload" className="cursor-pointer relative">
               {profileImage ? (
                 <img
                   src={profileImage}
                   alt="Profile"
                   className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
                 />
               ) : (
                 <FaUserCircle className="w-24 h-24 text-gray-400" />
               )}
               <input
                 type="file"
                 id="profileImageUpload"
                 accept="image/*"
                 className="hidden"
                 onChange={handleImageChange}
               />
             </label>
             <p className="text-gray-500 text-sm mt-2">Click to change photo</p>
           </div>
     
           {/* User Info */}
           <div className="space-y-4">
             <div className="flex justify-between">
               <label className="text-gray-700">Full Name</label>
               {isEditing ? (
                 <input
                   type="text"
                   className="border px-2 py-1 rounded-md w-2/3"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                 />
               ) : (
                 <p className="text-gray-600">{name}</p>
               )}
             </div>
     
             <div className="flex justify-between">
               <label className="text-gray-700">Email</label>
               {isEditing ? (
                 <input
                   type="email"
                   className="border px-2 py-1 rounded-md w-2/3"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               ) : (
                 <p className="text-gray-600">{email}</p>
               )}
             </div>
     
             <div className="flex justify-between">
               <label className="text-gray-700">Phone</label>
               {isEditing ? (
                 <input
                   type="tel"
                   className="border px-2 py-1 rounded-md w-2/3"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                 />
               ) : (
                 <p className="text-gray-600">{phone}</p>
               )}
             </div>
           </div>
     
           {/* Edit / Save Button */}
           <button
             className="mt-4 w-full py-2 text-white rounded-md transition duration-300"
             style={{
               backgroundColor: isEditing ? "green" : "#2563EB",
               hover: { backgroundColor: isEditing ? "darkgreen" : "#1E40AF" },
             }}
             onClick={() => setIsEditing(!isEditing)}
           >
             {isEditing ? "Save Changes" : "Edit Profile"}
           </button>
         </div>
        )}
        {/* Orders Section */}
        {activeSection === "orders" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Orders
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Order #12345</p>
                <p className="text-gray-600">Status: Delivered</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Order #12346</p>
                <p className="text-gray-600">Status: Pending</p>
              </div>
            </div>
          </div>
        )}
        {activeSection === "address" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Manage Addresses
            </h2>
            <div className="Addaddress border-gray-300 border-2 h-16 p-1 tracking-widest flex letter items-center mb-5 ">
              <div onClick={()=>setOpenFrom(!OpenFrom)} className="Add text-blue-800 cursor-pointer">
                <span  className="text-3xl text-center">+</span> ADD NEW ADDRESS
              </div>
            </div>
            {OpenFrom&&<div className="bg-[#F5FAFF] p-5 flex flex-col gap-5 border mb-8">
              <div className="text-blue-800 ">ADD A NEW ADDRESS</div>
              <div
                onClick={fetchLocation}
                className="bg-[#2874F0] w-[200px] p-2 flex flex-row items-center text-white"
              >
                <IoMdLocate />
                Use My current location
              </div>
              <div className="gap-5 flex">
                <input
                  className="pl-2"
                  onChange={(event) => getdata(event)}
                  type="text"
                  name="name"
                  value={addressdata.name}
                  placeholder="Name"
                />
                <input
                  className="pl-2"
                  onChange={(event) => getdata(event)}
                  type="number"
                  name="phone"
                  value={addressdata.phone}
                  placeholder="Phone"
                />
              </div>
              <div className="gap-5 flex">
                <input
                  className="pl-2"
                  onChange={(event) => getdata(event)}
                  type="number"
                  name="pincode"
                  value={addressdata.pincode}
                  placeholder="Pincode"
                />
                <input
                  className="pl-2"
                  onChange={(event) => getdata(event)}
                  type="text"
                  name="locality"
                  value={addressdata.locality}
                  placeholder="Locality"
                />
              </div>
              <div onChange={(event) => getdata(event)} className=" h-20 flex">
                <input
                  className="Address w-40 pl-2"
                  style={{ width: "200px" }}
                  type="text"
                  name="address"
                  value={addressdata.address}
                  placeholder="Address"
                />
              </div>
              <div className="gap-5 flex">
                <input
                  className="pl-2"
                  onChange={(event) => getdata(event)}
                  type="text"
                  name="city"
                  value={addressdata.city}
                  placeholder="City/town"
                />
                <select
                  name="state"
                  value={addressdata.state}
                  onChange={(event) => getdata(event)}
                  className="w-[200px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-gray-200"
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
                  <option value="andaman-nicobar">
                    Andaman and Nicobar Islands
                  </option>
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
              <div className="">
                <div className="">AddressType</div>
                <div className="radioinputmain flex gap-5">
                  <div className="flex gap-2 items-center">
                    <input
                      className="radioinput"
                      id="home"
                      type="radio"
                      name="adtype"
                      value={"Home"}
                      onChange={(event) => getdata(event)}
                    />
                    <label htmlFor="home">Home</label>
                  </div>
                  <div className="flex gap-2 items-center">
                    {" "}
                    <input
                      className="radioinput"
                      id="work"
                      type="radio"
                      name="adtype"
                      value={"work"}
                      onChange={(event) => getdata(event)}
                    />
                    <label htmlFor="work">Work</label>
                  </div>
                </div>
              </div>



              <div className="flex flex-row gap-2">
                <div
                  onClick={() => SubmitHandler()}
                  className="w-40 bg-blue-500 h-10 text-center p-2 cursor-pointer"
                >
                  Save
                </div>
                <div className="w-40 text-blue-500 h-10 text-center p-2 cursor-pointer">
                  cancel
                </div>
              </div>
            </div>}

            <div className="flex flex-col gap-5">
              {UserData &&
                UserData.Address.map((data, index) => (
                  <div
                    key={index} 
                    className="Addaddress border-gray-300 border-2  tracking-widest flex flex-col gap-2 p-2"
                  >
                    <div className="WorkPlace flex flex-row justify-between w-full items-center">
                      <div className="d">{data.adtype}</div>
                      <div
                        className="hamburger relative"
                        onMouseEnter={() => Show_edit_delete()}
                        onMouseLeave={() => Show_edit()}
                      >
                        <HiDotsVertical className="relative" />
                        {Showedit && (
                          <div className="absolute w-20 h-20 bg-white border-2 ml-[-68px] top-[-7px] flex items-center flex-col justify-evenly">
                            <div className="edit hover:text-blue-500 cursor-pointer">
                              Edit
                            </div>
                            <div className="delete hover:text-blue-500 cursor-pointer">
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="NamePhone flex flex-row gap-10">
                      <div>{data.name}</div>
                      <div>{data.phone}</div>
                    </div>
                    <div className="alladdress">{`${data.address},${data.city},${data.locality},${data.state},${data.pincode}`}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Payment Methods Section */}
        {activeSection === "payment" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Methods
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-700">Credit Card</p>
                <p className="text-gray-600">**** **** **** 1234</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">PayPal</p>
                <p className="text-gray-600">john.doe@paypal.com</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Add New Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
