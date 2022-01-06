import {initializeApp}from 'firebase/app';
import {AuthProvider}from 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB47JySTCfCg-Env9ZB8KVjY00I-ZJjlJA",
  authDomain: "bishwo-bhasa.firebaseapp.com",
  projectId: "bishwo-bhasa",
  storageBucket: "bishwo-bhasa.appspot.com",
  messagingSenderId: "727376450968",
  appId: "1:727376450968:web:e24ee8d271b913220107ed",
  measurementId: "G-7DXX8LWD5S"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = firebase.auth();
