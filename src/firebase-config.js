import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3tzkVQt10LzHO6QjjtHVOVwphV7CpGms",
    authDomain: "fir-app-631df.firebaseapp.com",
    projectId: "fir-app-631df",
    storageBucket: "fir-app-631df.appspot.com",
    messagingSenderId: "463801652869",
    appId: "1:463801652869:web:8c1df33de8728633e8fbec",
    measurementId: "G-Z9ZGP64K36"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app)