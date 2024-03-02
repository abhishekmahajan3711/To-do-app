// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0ZZgp8wJWmzI7hNy91XK8i3Fv3EfxVlM",
  authDomain: "to-do-list-fire-react-tail.firebaseapp.com",
  projectId: "to-do-list-fire-react-tail",
  storageBucket: "to-do-list-fire-react-tail.appspot.com",
  messagingSenderId: "301895492927",
  appId: "1:301895492927:web:7b0c3556499a217729df8a",
  measurementId: "G-2ZMWVM3FW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);