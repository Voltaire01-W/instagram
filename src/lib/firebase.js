import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB_OOdqTMisAAoMaTqDaagrUm8TTVCep2c",
  authDomain: "instagram-d5bc5.firebaseapp.com",
  projectId: "instagram-d5bc5",
  storageBucket: "instagram-d5bc5.appspot.com",
  messagingSenderId: "474427259921",
  appId: "1:474427259921:web:756efc1ca0086b7b8685b0",
  measurementId: "G-MZJC80RZR1"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
