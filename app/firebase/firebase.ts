// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt3nUeXs4YUaVZC8j2X_sJRSnPN8_iQik",
  authDomain: "gamestore-6c007.firebaseapp.com",
  projectId: "gamestore-6c007",
  storageBucket: "gamestore-6c007.appspot.com",
  messagingSenderId: "268973161550",
  appId: "1:268973161550:web:216e5f5ce22c5c43da171f",
  measurementId: "G-EJYGG4P29G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
