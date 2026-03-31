// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAzoZYK86QHUfMl6UmWmEzrwWTIisbTG8",
  authDomain: "login-auth-5ca89.firebaseapp.com",
  projectId: "login-auth-5ca89",
  storageBucket: "login-auth-5ca89.firebasestorage.app",
  messagingSenderId: "1068609219632",
  appId: "1:1068609219632:web:4befbedb765d27492ed1f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
