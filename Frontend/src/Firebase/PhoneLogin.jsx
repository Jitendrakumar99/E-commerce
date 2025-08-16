import { FcGoogle } from "react-icons/fc";
import { useState, useContext } from "react";
import { auth } from "./setup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from "../context/Context";

const PhoneLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { Url } = useContext(AppContext);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const userInfo = {
        uid: result.user.uid,
        Email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        lastLoginAt: new Date().toISOString(),
        FirstName: result.user.displayName.split(' ')[0] || '',
        LastName: result.user.displayName.split(' ').slice(1).join(' ') || '',
        Password: 'google-auth-' + result.user.uid,
      };

      try {
        const response = await axios.post(`${Url}Auth`, userInfo);
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        
        toast.success("Login successful!");
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Backend error:', error);
        if (error.response?.status === 200) {
          // User exists, store the token
          localStorage.setItem('user', JSON.stringify(userInfo));
          localStorage.setItem('token', error.response.data.token);
          localStorage.setItem('isLoggedIn', 'true');
          
          toast.success("Login successful!");
          navigate('/');
        } else {
          toast.error("Failed to sync with backend");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex gap-2 items-center justify-center py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
      disabled={loading}
    >
      <FcGoogle size={20} />
      <span>{loading ? "Signing in..." : "Continue with Google"}</span>
    </button>
  );
};

export default PhoneLogin;