import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/Context";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneLogin from "../Firebase/PhoneLogin";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showuser, setshowuser, loginhandler, Url } = useContext(AppContext);
  const [login_signup, setlogin_signup] = useState(true);
  const [showmessage, setshowmessage] = useState();
  const modalRef = useRef(null);
  const [signData, setsignData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Password: "",
    confirmpassword: "",
  });
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setshowuser(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setsignData((prev) => ({ ...prev, [name]: value }));
  };

  const changeHandler1 = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const submithandler = async () => {
    try {
      const res = await axios.post(`${Url}Auth`, signData);
      console.log("Signup Response:", res);
      setshowmessage("Signup successful!"); // Ensure this works
      toast.success("Signup successful!");
    } catch (err) {
      console.error("Signup Error:", err);
      
      if (err.response) {
        console.log("Error Response Data:", err.response.data);
        console.log("Error Status:", err.response.status);
        
        toast.error(err.response.data.message || "Signup failed.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  
  

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
     const check= await loginhandler(loginData);
      // Get the redirect path from location state or default to home
      toast.success("Login successful!");
      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });
    } catch (error) { 
      console.error("Login failed:", error);
      toast.error("Login failed");
    }
  };

  if (!showuser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div ref={modalRef} className={`bg-white rounded-xl shadow-2xl mx-auto transform transition-all overflow-hidden w-full ${
        login_signup 
          ? 'max-w-4xl sm:h-[500px] h-auto min-h-[85vh] sm:min-h-0' 
          : 'max-w-md sm:h-[400px] h-auto min-h-[60vh] sm:min-h-0'
      }`}>
        <div className={`flex flex-col lg:flex-row ${
          login_signup 
            ? 'sm:h-[500px] h-auto' 
            : 'sm:h-[400px] h-auto'
        }`}>
          {login_signup && (
            <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <img
                className="w-full h-full object-cover"
                src="https://www.pushengage.com/wp-content/uploads/2024/01/Create-Affiliate-Program.png"
                alt="Login"
              />
            </div>
          )}

          {/* Right side: Form */}
          <div className={`${login_signup ? 'w-full lg:w-1/2' : 'w-full'} p-3 sm:p-6 relative overflow-y-auto`}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 sm:mb-4 text-gray-800">
              {login_signup ? "Create Account" : "Welcome Back"}
            </h2>

            {login_signup ? (
              <form className="space-y-2 sm:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                      FirstName
                    </label>
                    <input
                      onChange={changeHandler}
                      value={signData.FirstName}
                      name="FirstName"
                      type="text"
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                      LastName
                    </label>
                    <input
                      onChange={changeHandler}
                      value={signData.LastName}
                      name="LastName"
                      type="text"
                      className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                    Phone
                  </label>
                  <input
                    onChange={changeHandler}
                    value={signData.Phone}
                    name="Phone"
                    type="Number"
                    className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                    Email
                  </label>
                  <input
                    onChange={changeHandler}
                    value={signData.Email}
                    name="Email"
                    type="email"
                    className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                  {showmessage && <div className="text-red-500 text-xs mt-1">{showmessage}</div>}
                </div>

                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                    Password
                  </label>
                  <input
                    onChange={changeHandler}
                    value={signData.Password}
                    name="Password"
                    type="password"
                    className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                    Confirm Password
                  </label>
                  <input
                    onChange={changeHandler}
                    value={signData.confirmpassword}
                    name="confirmpassword"
                    type="password"
                    className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                <div className="relative my-2 sm:my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <PhoneLogin />

                <button
                  type="button"
                  onClick={submithandler}
                  className="w-full bg-blue-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm"
                >
                  Create Account
                </button>
              </form>
            ) : (
              <form onSubmit={loginSubmitHandler} className="space-y-2 sm:space-y-3">
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                    Email
                  </label>
                  <input
                    onChange={changeHandler1}
                    value={loginData.Email}
                    name="Email"
                    type="email"
                    className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-bold mb-1">
                    Password
                  </label>
                  <input
                    onChange={changeHandler1}
                    value={loginData.Password}
                    name="Password"
                    type="password"
                    className="w-full px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm"
                >
                  Sign In
                </button>
              </form>
            )}

            <p className="mt-3 sm:mt-4 text-center text-xs text-gray-600">
              {login_signup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setlogin_signup(!login_signup)}
                className="text-blue-600 ml-1 hover:text-blue-700 font-semibold"
              >
                {login_signup ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
