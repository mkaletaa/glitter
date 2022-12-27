import {useState} from 'react'
import { auth } from '../firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { collection, doc, getDocs, getFirestore, query, deleteDoc, where, updateDoc } from 'firebase/firestore';

const useDeletePost = (setRefetchTime) =>{
    const [deletePost, setDeletePost] = useState()
    const [deletePostAuthor, setDeletePostAuthor] = useState('')

    function deletePostFn(){
        //usuwanie z obydwu baz
        const db = getFirestore()
    
        const docRef = doc(db, `posts/${deletePostAuthor}/posts`, `${deletePost}`)
              deleteDoc(docRef).then(()=>{setRefetchTime(10)})
    
        const docRef2 = doc(db, `allposts`, `${deletePost}`)
        deleteDoc(docRef2).then(()=>{setRefetchTime(10)})
      }
    
    return {deletePostFn, setDeletePost, setDeletePostAuthor }

}

export default useDeletePost