import React,{useState, useEffect} from 'react'
import ProfilePic from '../components/ProfilePic'
import MainLayout from '../layout/MainLayout'
import {MdModeEditOutline} from 'react-icons/md'
import { userFromLocalStorage } from '../utils/userFromLocalStorage'
import ModalComponent from '../components/ModalComponent'
import DragDrop from '../components/DragDrop'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { doc, setDoc } from "firebase/firestore"; 
import { db, storage } from '../config/firebase-config'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createNotification } from '../service/notification'


const ProfileScreen = () => {
    const[user, setUser] = useState({});
    const[openModal, setOpenModal] =useState(false);

    useEffect(() => {
    if(userFromLocalStorage()) {
        setUser(userFromLocalStorage())
    }
    }, []);

    return (
         <ModalComponent 
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Update profile"
      component={<UpdateProfileForm setOpenModal={setOpenModal} user={user}/>}
      >
        <MainLayout setOpenModal={null}>
            <div className="profile box-shadow border-radius">
                {user.photoUrl ? <div className='profile-image'>
               <img src={user.photoUrl} alt="profile pic" />
           </div> : <ProfilePic />}
                <button className='btn btn__circle' onClick={() => setOpenModal(true)}>
                    <MdModeEditOutline />
                </button>
                <div className="profile__details">
                    <div className='row'>
                        <div className="label">username :</div>
                        <div className='value'>@{user.username}</div>
                    </div>
                    <div className='row'>
                        <div className="label">name :</div>
                        <div className='value'>{user.name}</div>
                    </div>
                    <div className='row'>
                        <div className="label">bio :</div>
                        <div className='value'>{user.bio}</div>
                    </div>
                </div>
            </div>
        </MainLayout>
        </ModalComponent>
    )
}


function UpdateProfileForm ({setOpenModal, user}) {
  const[files, setFiles] = useState([]);
  const[text, setText] = useState('');
  const[dragDrop, setDragDrop] = useState(true);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');
 
  const updateProfileFunc = async ({username, name, bio}, setSubmitting) => {
      const userRef = doc(db, 'users', user.userId);
      const userLocal = {
          userId: user.userId,
          username,
          name,
          bio,
          photoUrl: user.photoUrl
      }
      if(files.length > 0) {
        const storageRef = ref(storage, `/profile/${files[0].file.name}`);
      await uploadBytes(storageRef, files[0].file).then((snapshot) => {
                    if(snapshot) {
                        getDownloadURL(storageRef).then((url) => {
                            if(url) {
                                setDoc(userRef, { username, name, bio, photoUrl: url }, { merge: true }).then(() => {
                                    window.localStorage.clear();
                                    userLocal.photoUrl = url
                                    window.localStorage.setItem("userInfo", JSON.stringify(userLocal));
                                    createNotification("updated profile");
                                    setSubmitting(false);
                                    setOpenModal(false);
                                    window.location.reload();
                                });
                            }
                        })
                    }
                });
            } else {
                setDoc(userRef, { username, name, bio, photoUrl: user.photoUrl }, { merge: true }).then(() => {
                    window.localStorage.clear();                
                    window.localStorage.setItem("userInfo", JSON.stringify(userLocal));
                    createNotification("updated profile");
                    setSubmitting(false);
                    setOpenModal(false);
                    window.location.reload();
                })
            }
  }

  return <div className="form__login--content width-100">
                    <Formik
                        initialValues={{ username: user?.username, name: user?.name, bio: user?.bio }}
                        validate={values => {
                            const errors = {};
                           
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                           updateProfileFunc(values, setSubmitting);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form className='form__login--form'>
                                <div className="form-group">
                                <DragDrop files={files} setFiles={setFiles} closeDrag={setDragDrop} />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <Field type="text" name="username" placeholder="username" className="input-field" />
                                    <ErrorMessage name="username" component="div" className="error-msg" />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <Field type="text" name="name" placeholder="name" className="input-field"/>
                                    <ErrorMessage name="name" component="div" className="error-msg" />
                                </div>
                                <div className="form-group">
                                    <label>Bio</label>
                                    <Field type="text" name="bio" placeholder="bio" className="input-field"/>
                                    <ErrorMessage name="bio" component="div" className="error-msg" />
                                </div>
                                
                            <button className="btn btn__primary" type="submit" disabled={isSubmitting} >
                                Update
                            </button>
                            </Form>
                        )}
                        </Formik>
                </div>
}

export default ProfileScreen
