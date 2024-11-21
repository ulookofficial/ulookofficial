// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjGFIMQGz2B0IiaWFhyZXvriCUavLGL4Y",
  authDomain: "ulook-436cc.firebaseapp.com",
  projectId: "ulook-436cc",
  storageBucket: "ulook-436cc.firebasestorage.app",
  messagingSenderId: "1011105827352",
  appId: "1:1011105827352:web:70a1d046b4b9aaaa25916d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }
