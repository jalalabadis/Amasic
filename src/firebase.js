// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDDQoOAVkkoElPDz-WOMnskA7lxOm3Y09w",
  authDomain: "amasic-2b3de.firebaseapp.com",
  databaseURL: "https://amasic-2b3de-default-rtdb.firebaseio.com",
  projectId: "amasic-2b3de",
  storageBucket: "amasic-2b3de.appspot.com",
  messagingSenderId: "509415652876",
  appId: "1:509415652876:web:59b3e391d11edc3dbaf829",
  measurementId: "G-E01GM53PEL"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);