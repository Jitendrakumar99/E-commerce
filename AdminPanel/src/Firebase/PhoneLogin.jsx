import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { auth } from "./setup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const PhoneLogin = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserLogin = (userData) => {
    try {
      const userInfo = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        lastLoginAt: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      toast.success("Login successful!");
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error storing user data:', error);
      toast.error("Error storing user information");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      handleUserLogin(result.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        {user ? (
          <div className="text-center text-white">
            <h2 className="font-medium text-2xl mb-4">
              👍 Login Success
            </h2>
            <div className="bg-white rounded-lg p-4 text-gray-800 mb-4">
              <p className="mb-2"><strong>UID:</strong> {user.uid}</p>
              <p className="mb-2"><strong>Email:</strong> {user.email}</p>
              <p className="mb-2"><strong>Name:</strong> {user.displayName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> CODE A PROGRAM
            </h1>
            
            <button
              onClick={handleGoogleLogin}
              className="bg-white w-full flex gap-2 items-center justify-center py-2.5 text-gray-700 rounded hover:bg-gray-100"
              disabled={loading}
            >
              <FcGoogle size={20} />
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhoneLogin;