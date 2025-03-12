// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCXEhlCCm4CxK0T2ZSbhJSlD5y6-PKUVO8",
  authDomain: "ecommerce-717ae.firebaseapp.com",
  projectId: "ecommerce-717ae",
  storageBucket: "ecommerce-717ae.firebasestorage.app",
  messagingSenderId: "136462232940",
  appId: "1:136462232940:web:110161ed79518667785749"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);