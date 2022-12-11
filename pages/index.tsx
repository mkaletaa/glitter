import React, {useState, useRef} from 'react'
import {getFirestore, collection, getDocs, getDoc, setDoc, deleteDoc, doc, query, where, updateDoc} from 'firebase/firestore'
import {TextField, Button} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import Posts from '../components/Posts'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';



export default function Index() {
  const [user, loading] = useAuthState(auth)
  const [newPost, setNewPost] = useState('') 
  const [publishProgress, setPublishProgress] = useState(false)
  const [publishBtn, setPublishBtn] = useState(false)
  const db = getFirestore()



  function publish(){
    if(!/^\s*$/.test(newPost)){
      setPublishProgress(true)

    let id = 9999999999999 - Date.now()
    const date = JSON.stringify(new Date().getDate()) + '-' +
                JSON.stringify(new Date().getMonth()+1) + '-' +
                JSON.stringify(new Date().getFullYear())
    setDoc(doc(db, `posts/${user?.uid}/posts/${id}`), 
    {  
      uid: user?.uid,
      text: newPost,
      likes: 0,
      isLikedBy: [],
      date,
      id,
      author: user?.uid
    
    }).then(()=> {setNewPost(''); setPublishProgress(false)})


    setDoc(doc(db, `allposts/${id}`), 
    {  
      uid: user?.uid,
      text: newPost,
      likes: 0,
      isLikedBy: [],
      date,
      id,
      author: user?.uid
    
    })
  
    }
  }

// alert('dusp')

  // function writeUserData(userId:string, name:string, email:string, imageUrl:number) {
  //   const db = getDatabase();
  //   alert('de')
  //   set(ref(db, 'users/' + userId), {
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }


  return (
    <>
     <div className='topBarMain'>
       <span>Home</span>
       {/* <HomeRoundedIcon style={{float: 'right', marginTop: '20px'}}></HomeRoundedIcon> */}
     </div>
     <div className='topBarRight'></div>
 

      <div className="main" >

     {user && <div className="newPost">
        <TextField
        id='newPost'
        multiline
        value={newPost}
        onChange={e=>setNewPost(e.target.value)}
        placeholder='create a new post'
        onFocus={e=>setPublishBtn(true)}
        onBlur={e=>setPublishBtn(/^\s*$/.test(newPost) ? false : true)}
        sx={{width: '100%'}}
        />

      {publishBtn && <Button
        variant='contained'
        onClick={e=>publish()}>
        {publishProgress ? <CircularProgress color="secondary" /> : 'publish'}
      </Button>}

      </div>}

      <Posts uid={null}></Posts>

      </div>



      </>
  )
}
