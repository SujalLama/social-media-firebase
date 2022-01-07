import {collection, addDoc, getDocs,  doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { db, storage } from '../config/firebase-config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { userFromLocalStorage } from "../utils/userFromLocalStorage";
import { createNotification } from "./notification";


export async function createPost ({text, files}, setOpenModal, setError, setLoading) {
        try{
            const user = userFromLocalStorage();
            const creator = {
                id: user.userId,
                username: user.username,
                name: user.name,
                photoUrl: user.photoUrl,
            }
            if(files.length > 0) {
                
                const storageRef = ref(storage, `/posts/${files[0].file.name}`);
            if(files[0].file.type.split('/')[0] === "image") {
                // 'file' comes from the Blob or File API
                await uploadBytes(storageRef, files[0].file).then((snapshot) => {
                    if(snapshot) {
                        
                        getDownloadURL(storageRef).then((url) => {
                            if(url) {
                                addDoc(collection(db, "posts"), {
                                    text,
                                    photoUrl: url,
                                    videoUrl: '',
                                    like: [],
                                    creator,
                                    postedAt: new Date(),
                                }).then(docRef => {
                                    createNotification("created post.");
                                    setOpenModal(false);
                                    setLoading(false);
                                    // window.location.reload();
                                });
        
                            }
                        })
                    }
                });
                return
            }

             await uploadBytes(storageRef, files[0].file).then((snapshot) => {
                    if(snapshot) {
                        getDownloadURL(storageRef).then((url) => {
                            if(url) {
                                addDoc(collection(db, "posts"), {
                                    text,
                                    photoUrl: '',
                                    videoUrl: url,
                                    like: [],
                                    creator,
                                    postedAt: new Date(),
                                }).then(docRef => {
                                    createNotification("created post.");
                                    setOpenModal(false);
                                    setLoading(false);
                                    // window.location.reload();
                                });
        
                            }
                        })
                    }
                });
            } else {
                  addDoc(
                      collection(db, "posts"), {
                                    text,
                                    fileUrl: '',
                                    like: [],
                                    creator,
                                    postedAt: new Date(),
                    }).then(docRef => {
                        createNotification("created post.");
                             setOpenModal(false);
                            setLoading(false);
                            //  window.location.reload();
                    });
            }
     
     } catch (e) {
      console.error("Error adding document: ", e);
      setError(e);
    }
}


export async function likePost (postId, userId, isLike) {
    try {
    //     setDoc(userRef, { username, name, bio, photoUrl: url }, { merge: true }).then(() => {
        //     // Set the "capital" field of the city 'DC'
        // });
            const postsRef = doc(db, "posts", postId);
            if(!isLike) {
                 await updateDoc(postsRef, {
                    like: arrayRemove(userId)
                });
            } else {
                await updateDoc(postsRef, {
                    like: arrayUnion(userId)
                });
                createNotification(`liked post: ${postId}`);
            }

    } catch (error) {
        console.log(error)
    }
    
}