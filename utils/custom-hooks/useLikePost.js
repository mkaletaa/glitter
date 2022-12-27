import {useState} from 'react'
import { auth } from '../firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { collection, doc, getDocs, getFirestore, query, deleteDoc, where, updateDoc } from 'firebase/firestore';

const useLikePost = (setRefetchTime) =>{
    const [lackUserAlert, setLackUserAlert] = useState(false)
    const [authorAlert, setAuthorAlert] = useState(false)
    const [otherAlert, setOtherAlert] = useState(false)
    const [user, laoding] = useAuthState(auth)

    const db = getFirestore()

    
    function like(id, likes, author, isLikedBy){
        const docRef = doc(db, `posts/${author}/posts`, `${id}`)
        const docRef2 = doc(db, `allposts`, `${id}`)
    if(!user) setLackUserAlert(true)
    else if(user.uid===author) setAuthorAlert(true)
    else  if(isLikedBy.some((a)=>{return (a===user.uid)}))
          {
            updateDoc(docRef,{
              likes: likes-1,
              isLikedBy: isLikedBy.filter((a)=>{return (a!==user.uid)})
            }).then(()=>{setRefetchTime(10)})

            updateDoc(docRef2,{
              likes: likes-1,
              isLikedBy: isLikedBy.filter((a)=>{return (a!==user.uid)})
            }).then(()=>{setRefetchTime(10)})
          }
    else  if(!isLikedBy.some((a)=>{return (a===user.uid)}))
          {
            updateDoc(docRef,{
              likes: likes+1,
              isLikedBy: [...isLikedBy, user.uid]
            }).then(()=>{setRefetchTime(10)})

            updateDoc(docRef2,{
              likes: likes+1,
              isLikedBy: [...isLikedBy, user.uid]
            }).then(()=>{setRefetchTime(10)})
          } 
    else setOtherAlert(true)
        }
    
    return {like, lackUserAlert, authorAlert, otherAlert, setLackUserAlert, setAuthorAlert, setOtherAlert}

}

export default useLikePost