import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA66TqkJ546u7E3qeGlq4WVqnfc2Cx7A9w",
    authDomain: "flipfashion-fa93b.firebaseapp.com",
    projectId: "flipfashion-fa93b",
    storageBucket: "flipfashion-fa93b.appspot.com",
    messagingSenderId: "123598279382",
    appId: "1:123598279382:web:fdf4968afc1d7a12aeef77",
    measurementId: "G-33SFYF0FX6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };    
