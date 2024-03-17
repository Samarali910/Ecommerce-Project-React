 
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
 
const firebaseConfig = {
  apiKey: "AIzaSyBCWZVLt7Ousy3xA9V3qxIb1c_vW9UdIPY",
  authDomain: "ecommerce-website-2nd.firebaseapp.com",
  projectId: "ecommerce-website-2nd",
  storageBucket: "ecommerce-website-2nd.appspot.com",
  messagingSenderId: "651620937121",
  appId: "1:651620937121:web:97faedfc6cbc97f5a4efe0"
};

 
const app = initializeApp(firebaseConfig);
const firedb=getFirestore(app);
const auth=getAuth(app);

export {firedb,auth};