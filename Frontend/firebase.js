// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB66MvuoB6XmctjdQo8W4rw8LgtAoPmRLg",
  authDomain: "full-stack-7c4d7.firebaseapp.com",
  projectId: "full-stack-7c4d7",
  storageBucket: "full-stack-7c4d7.firebasestorage.app",
  messagingSenderId: "652493502104",
  appId: "1:652493502104:web:35c60e0998d5fe5a3fc2ed",
  measurementId: "G-Z6FGCZ8BVC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);