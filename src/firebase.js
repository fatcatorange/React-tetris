// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxUK7BcQ_QG7BKirpy-iMPfQZfgen_ZWY",
    authDomain: "tetris-4c07f.firebaseapp.com",
    projectId: "tetris-4c07f",
    storageBucket: "tetris-4c07f.appspot.com",
    messagingSenderId: "1073126131958",
    appId: "1:1073126131958:web:54dde22b23257d09ca84d7"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const waitingListCollection = collection(db, "waitingList")
export const gameRoomColloection = collection(db,"gameRoom")