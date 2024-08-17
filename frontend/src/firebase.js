// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-afec1.firebaseapp.com",
  projectId: "mern-estate-afec1",
  storageBucket: "mern-estate-afec1.appspot.com",
  messagingSenderId: "454997596009",
  appId: "1:454997596009:web:3dd62a2aa7773097160ff8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);