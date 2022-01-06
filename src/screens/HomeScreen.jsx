import React, {useState} from 'react';
import ContentAdd from '../components/ContentAdd';
import Header from '../components/Header';
import ModalComponent from '../components/ModalComponent';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import ProfileInfo from '../components/ProfileInfo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DropzoneComponent from '../components/DropzoneComponent';
import {AiOutlineVideoCameraAdd} from 'react-icons/ai';
import {MdOutlineAddPhotoAlternate} from 'react-icons/md';
import DragDrop from '../components/DragDrop';

const HomeScreen = () => {
  const[openModal, setOpenModal] =useState(false);
    return (
      <ModalComponent 
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Create Post"
      component={<CreatePostForm />}
      >
        <div className='home'>
          <div className="top-bar">
          <Header setOpenModal={setOpenModal} />
          </div>
          <div className="navbar">
          <ProfileInfo />
          <Navbar />
          </div>
          <div className="main-content">
            <ContentAdd  setOpenModal={setOpenModal} btn="post it" placeholder="What's new, Sujal?"/>
            <Posts />
          </div>
          <div className="sidebar">
          </div>
        </div>
    </ModalComponent>
    );
}

function CreatePostForm () {
  const[files, setFiles] = useState([]);
  const[dragDrop, setDragDrop] = useState(true);

  return  <div className="form__login--content width-100">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                            errors.email = 'Required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                            errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            }, 400);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form className='form__login--form'>
                                <div className="form-group">
                                    <textarea type="text" name="post" placeholder="What's going on?" className="input-field post-create-field"/>
                                    {/* <ErrorMessage name="email" component="div" className="error-msg" /> */}
                                </div>
                                {dragDrop && <div className="form-group">
                                <DragDrop files={files} setFiles={setFiles} closeDrag={setDragDrop} />
                                </div>}
                            <button className="btn btn__primary margin-top" type="submit" disabled={isSubmitting}>
                                Post it
                            </button>
                            </Form>
                        )}
                        </Formik>
                </div>
}

export default HomeScreen;
