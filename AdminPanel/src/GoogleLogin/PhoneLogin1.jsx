import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "495349777657-7lqqcjokm94hg0kcctnpmojrqhdfomnm.apps.googleusercontent.com";

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
