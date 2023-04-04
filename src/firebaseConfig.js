// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw1x9_6s4Jir0C7xUdgcVsQEMi8x_W9bQ",
  authDomain: "journal-6a69e.firebaseapp.com",
  projectId: "journal-6a69e",
  storageBucket: "journal-6a69e.appspot.com",
  messagingSenderId: "708981751746",
  appId: "1:708981751746:web:e2ffb216b3e198e40be05b"
};

// const nodemailer = require('nodemailer')

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
