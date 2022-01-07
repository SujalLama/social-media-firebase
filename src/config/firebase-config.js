import {getFirestore} from 'firebase/firestore';
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAemB-12-vjQXfMotyMxXAAg15LFe7sICo",
  authDomain: "social-media-85e4b.firebaseapp.com",
  projectId: "social-media-85e4b",
  storageBucket: "social-media-85e4b.appspot.com",
  messagingSenderId: "1083964740593",
  appId: "1:1083964740593:web:36424439fd27dc5d016a50",
  measurementId: "G-4CF2WRQHRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


