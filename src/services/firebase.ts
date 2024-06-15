// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDQstc7OPgvLjf7jRBU01NnvoUarlW6QzM",
  authDomain: "finance-app-668d2.firebaseapp.com",
  projectId: "finance-app-668d2",
  storageBucket: "finance-app-668d2.appspot.com",
  messagingSenderId: "263979267600",
  appId: "1:263979267600:web:ab54085d17d0897972bc95",
  measurementId: "G-7ZLH0BH2Z5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)