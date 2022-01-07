import React, {useState, useEffect} from 'react';
import ContentAdd from '../components/ContentAdd';
import ModalComponent from '../components/ModalComponent';
import Posts from '../components/Posts';
import DragDrop from '../components/DragDrop';
import MainLayout from '../layout/MainLayout';
import { createPost } from '../service/post';
import { db } from '../config/firebase-config';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { userFromLocalStorage } from '../utils/userFromLocalStorage';
import Loader from "react-loader-spinner";

const HomeScreen = () => {
  const[openModal, setOpenModal] =useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const[user, setUser] = useState({});

  //listening to posts
   useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("postedAt", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({id: doc.id, ...doc.data()});
        });
        setPosts(posts);
        setLoading(false);        
      });
      return () => unsubscribe();
  }, []);


    useEffect(() => {
    if(userFromLocalStorage()) {
      setUser(userFromLocalStorage())
    }
    }, []);


    return (
      <ModalComponent 
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Create Post"
      component={<CreatePostForm setOpenModal={setOpenModal} />}
      >
       <MainLayout setOpenModal={setOpenModal}>
            <ContentAdd  setOpenModal={setOpenModal} btn="post it" placeholder={`What's new, ${user.username}?`}/>
           {loading 
           ? <Loader
            type="Rings"
            color="#1778f2"
            height={100}
            width={100}
            timeout={3000} //3 secs
          /> : 
          <Posts posts={posts} user={user}/>}
        </MainLayout> 
    </ModalComponent>
    );
}


function CreatePostForm ({setOpenModal}) {
  const[files, setFiles] = useState([]);
  const[text, setText] = useState('');
  const[dragDrop, setDragDrop] = useState(true);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');

  const createPostFunc = async (e) => {
      e.preventDefault();
      setLoading(true);
      await createPost({text, files}, setOpenModal, setError, setLoading)
  }

  

  return  <div className="form__login--content width-100">
                            <form className='form__login--form'>
                                {error && <div>{error}</div>}
                                <div className="form-group">
                                    <textarea type="text" name="text" 
                                    placeholder="What's going on?" className="input-field post-create-field"
                                    value={text}
                                    onChange={(e)=> setText(e.target.value)}
                                    />
                                </div>
                                {dragDrop && <div className="form-group">
                                <DragDrop files={files} setFiles={setFiles} closeDrag={setDragDrop} />
                                </div>}
                            <button className="btn btn__primary margin-top" type="submit" onClick={createPostFunc} disabled={loading}>
                                Post it
                            </button>
                            </form>
                </div>
}

export default HomeScreen;
