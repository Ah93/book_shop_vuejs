import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyD6b69ogE_FeeCkOmHwZDk2p27RPo9d6OY",
    authDomain: "books-d9a5f.firebaseapp.com",
    databaseURL: "https://books-d9a5f-default-rtdb.firebaseio.com",
    projectId: "books-d9a5f",
    storageBucket: "books-d9a5f.appspot.com",
    messagingSenderId: "111529234911",
    appId: "1:111529234911:web:7cf5c6db89486e3ac4b46a",
    measurementId: "G-TNHT6SWF2R"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const fireAuth = firebaseApp.auth();

export {firebaseApp, db, fireAuth}