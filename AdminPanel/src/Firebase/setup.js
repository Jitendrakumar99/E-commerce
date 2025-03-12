// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const api= await import.meta.env.VITE_APIKEY;
const authDomain= await import.meta.env.VITE_AUTHDOMAIN;
const projectId=await import.meta.env.VITE_PROJECTID;
const storageBucket=await import.meta.env.VITE_STORAGEBUCKET;
const messagingSenderId=await import.meta.env.VITE_MESSAGINGSENDERID;
const appId=await import.meta.env.VITE_APPID;

console.log(api);
const firebaseConfig = {
  apiKey: api,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);