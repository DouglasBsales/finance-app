// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDQstc7OPgvLjf7jRBU01NnvoUarlW6QzM",
  authDomain: "finance-app-668d2.firebaseapp.com",
  databaseURL: "https://finance-app-668d2-default-rtdb.firebaseio.com",
  projectId: "finance-app-668d2",
  storageBucket: "finance-app-668d2.appspot.com",
  messagingSenderId: "263979267600",
  appId: "1:263979267600:web:ab54085d17d0897972bc95",
  measurementId: "G-7ZLH0BH2Z5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
