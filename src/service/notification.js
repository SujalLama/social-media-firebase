import {collection, addDoc,  doc, updateDoc, arrayUnion,} from "firebase/firestore";
import { db} from '../config/firebase-config';
import { userFromLocalStorage } from "../utils/userFromLocalStorage";


export async function createNotification (message) {
        try{
            const user = userFromLocalStorage();
            const creator = {
                id: user.userId,
                username: user.username,
            }

            addDoc(
                collection(db, "notifications"), 
                {
                    message,
                    viewed: [user.userId],
                    creator,
                    postedAt: new Date(),
                })
                .then(docRef => { 
                    });
        } catch (e) {
        console.error("Error adding document: ", e);
        }
}


export async function viewNotification (notificationId, userId) {
    try {
            const notificaitonsRef = doc(db, "notifications", notificationId);
            updateDoc(notificaitonsRef, {
                    viewed: arrayUnion(userId)
                }).then(() => {
                    window.location.reload();
                });
    } catch (error) {
        console.log(error)
    }
    
}