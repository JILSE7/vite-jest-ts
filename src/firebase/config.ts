// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvBsZwNbEUmIhWZ46hVlREUitDAwFs9Mk",
  authDomain: "journal-said.firebaseapp.com",
  projectId: "journal-said",
  storageBucket: "journal-said.appspot.com",
  messagingSenderId: "189793199878",
  appId: "1:189793199878:web:1c9de8dfe6ce23dd852087"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore(FirebaseApp)