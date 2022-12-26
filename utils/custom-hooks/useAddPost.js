import {useState} from 'react'
import {getFirestore, setDoc, doc} from 'firebase/firestore'
import { auth } from '../firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'

const useAddPost = () =>{

    const [user, loading] = useAuthState(auth)
    const [newPost, setNewPost] = useState('') 
    const [publishProgress, setPublishProgress] = useState(false)
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
    
    return {publish, user, newPost, publishProgress, setNewPost, setPublishProgress}

}

export default useAddPost