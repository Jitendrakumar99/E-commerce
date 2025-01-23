import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/Context";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { showuser, setshowuser,loginhandler,Url } = useContext(AppContext);
  const [login_signup, setlogin_signup] = useState(true);
  const [showmessage, setshowmessage] = useState();
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

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setsignData((prev) => ({ ...prev, [name]: value }));
  };


  const changeHandler1 = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };


  const submithandler = async () => {
    axios
      .post(`${Url}Auth`, signData)
      .then((res) => {
        console.log(res);
        setshowmessage("");
      })
      .catch((err) => {
        console.log(err);
        toast.success("Email Already registered");
      });
  };

  const loginSubmitHandler =async (e) => {
    e.preventDefault();
    await loginhandler(loginData)
    navigate("/home");
  };

  useEffect(() => {
   
  }, [signData, loginData]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img
            className="w-[150%] left-0 absolute  h-full"
            src="https://www.pushengage.com/wp-content/uploads/2024/01/Create-Affiliate-Program.png"
            alt=""
          />
        </div>

        {/* Right side: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            {login_signup ? "Sign Up" : "Log In"}
          </h2>

          {login_signup ? (
            <form>
              <div className="flex gap-5">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    FirstName
                  </label>
                  <input
                    onChange={changeHandler}
                    value={signData.FirstName}
                    name="FirstName"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    LastName
                  </label>
                  <input
                    onChange={changeHandler}
                    value={signData.LastName}
                    name="LastName"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Phone
                </label>
                <input
                  onChange={changeHandler}
                  value={signData.Phone}
                  name="Phone"
                  type="Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={changeHandler}
                  value={signData.Email}
                  name="Email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {showmessage && <div className="">{showmessage}</div>}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={changeHandler}
                  value={signData.Password}
                  name="Password"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <input
                  onChange={changeHandler}
                  value={signData.confirmpassword}
                  name="confirmpassword"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={submithandler}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={loginSubmitHandler}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={changeHandler1}
                  value={loginData.Email}
                  name="Email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={changeHandler1}
                  value={loginData.Password}
                  name="Password"
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Log In
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            {login_signup
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              onClick={() => setlogin_signup(!login_signup)}
              className="text-blue-500 ml-2 underline"
            >
              {login_signup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
