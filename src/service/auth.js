import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../config/firebase-config';
import { db } from '../config/firebase-config';
import { setDoc, doc, getDoc} from "firebase/firestore";
import history from '../utils/history';
import { createNotification } from './notification';

export const register = async ({email, password, name}, setError) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = {
            name,
            username: name,
            createdAt: new Date(),
            photoUrl: '',
            bio: '',
            userId: userCredential.user.uid, 
        }

       await setDoc(doc(db, "users", userCredential.user.uid), user);
       window.localStorage.setItem("userInfo", JSON.stringify(user))
       createNotification("registered in the app.");
        history.replace('/');
    } catch (error) {
        setError(error.message)
    }
};

export const login = async ({email, password}, setError) => {
    try {
        console.log(email,password);
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // const data = await getDoc(doc(db, "users", userCredential.uid));
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            window.localStorage.setItem("userInfo", JSON.stringify({userId: userCredential.user.uid, ...docSnap.data() }));
            createNotification("logged in the app.");
            history.replace('/');
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    } catch (error) {
        setError(error.message)
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        window.localStorage.clear();
        history.replace('/login')
    } catch (error) {
        console.log(error)
    }
}
