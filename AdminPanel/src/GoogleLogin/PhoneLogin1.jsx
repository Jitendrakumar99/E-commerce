import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function PhoneLogin() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="">
        <h1>Google Sign In</h1>
        <GoogleLogin
          onSuccess={(response) => {
            console.log("Login Success:", response);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default PhoneLogin;
