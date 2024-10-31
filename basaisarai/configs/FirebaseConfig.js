// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import{getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUjaLm9M8QoREZYlBcYxji-OrClpyrLFk",
  authDomain: "basaisaraiofficial.firebaseapp.com",
  projectId: "basaisaraiofficial",
  storageBucket: "basaisaraiofficial.appspot.com",
  messagingSenderId: "654516693322",
  appId: "1:654516693322:web:c217b035e9ae684882f9b3",
  measurementId: "G-4ZMLJWGTGK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const storage=getStorage(app);
//const analytics = getAnalytics(app);