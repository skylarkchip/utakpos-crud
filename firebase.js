// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxU6YCQiwpD6V8NpMRg6Kldyap88tXB1Y",
  authDomain: "simple-crud-6807e.firebaseapp.com",
  projectId: "simple-crud-6807e",
  storageBucket: "simple-crud-6807e.appspot.com",
  messagingSenderId: "401357099799",
  appId: "1:401357099799:web:e20bb24102cc571dc91d52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
