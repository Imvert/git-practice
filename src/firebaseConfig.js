import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCidY40ioTvS5stcSn9pPy5NnJrz17LZ_M",
  authDomain: "practica-firebase-ada82.firebaseapp.com",
  projectId: "practica-firebase-ada82",
  storageBucket: "practica-firebase-ada82.appspot.com",
  messagingSenderId: "646575565715",
  appId: "1:646575565715:web:6da2c8e665f4a8b4e0d666",
  measurementId: "G-G14YZEVSYB",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const store = fire.firestore();
export { store };
