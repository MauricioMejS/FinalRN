import firebase from "firebase/app";
import "firebase/firestore";
require("firebase/firestore");
require("firebase/auth");

var firebaseConfig = {
  apiKey: "AIzaSyDWxbjWuoDJz0Z6BZfJibjSRasYM8S2i4I",
  authDomain: "booksale-52d83.firebaseapp.com",
  projectId: "booksale-52d83",
  storageBucket: "booksale-52d83.appspot.com",
  messagingSenderId: "1029625093772",
  appId: "1:1029625093772:web:db4be0e58594b317b3e5a9",
  measurementId: "G-7LVGTW9C34",
};
export default firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
