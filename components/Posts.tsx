import React, {useEffect, useState} from 'react'
import posts from '../styles/posts.module.scss'
import { collection, doc, getDocs, getFirestore, query, deleteDoc, where } from 'firebase/firestore';
import axios from 'axios'
import { useQuery } from 'react-query';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material'

export default function Posts({uid}:any) {
  const router = useRouter()
  const { userUid } = router.query
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deletePost, setDeletePost] = useState<number>()
  const [user, laoding] = useAuthState(auth)
  const db = getFirestore()
  // const q = query(colRef, where("uid", "==", `${uid}`))


  // useEffect(()=>{
  //   setInterval(()=>{
  //     console.log(userUid)
  //   }, 500)
  // }, [])
  const [refetchTime, setRefetchTime] = useState(100)
  const {data: fetchedPosts, refetch} = useQuery('dataa', ()=>{
    return axios.get(`http://localhost:3000/api/posts/${uid}`)
  },{
    refetchInterval: refetchTime,
    onSuccess,
    onError: ()=>console.log('error')
  })

  function onSuccess(){
    console.log('sukces')
    if(fetchedPosts?.data!==undefined)
    setRefetchTime(0)
  }

  function deletePostFn(e?:number){
    const db = getFirestore()
    const colRef = collection(db, `posts_${uid}`)
    const q = query(colRef, where("date", "==", deletePost))

    getDocs(q)
    .then((snapshot)=>{
      const docRef = doc(db, `posts_${uid}`, `${snapshot.docs[0].id}`)
            deleteDoc(docRef).then(()=>{setRefetchTime(10)})
    })
  }

  return (
    <div >

      {fetchedPosts?.data[0].text ? fetchedPosts.data.map((post:any)=>{
        return (
        <div key={post.date}>{post.text}, likes: {post.likes}
           {user?.uid===uid ? <button 
            onClick={e=>{setDeleteDialog(true); setDeletePost(post.date)}}>
              delete</button> :
            <button>like</button>}
        </div>)
      }) : 'brak postów'}


          <Dialog 
          // id={modal.overlay}
          // fullScreen={fullScreen}
          // TransitionComponent={Transition}
          open={deleteDialog}
          onClose={e=>setDeleteDialog(false)}  >
            <DialogTitle>Are you sure you want to delete this post?</DialogTitle>

            <DialogContent>You cannot undo this action.</DialogContent>
            <DialogActions>
              <Button 
              onClick={e=>{setDeleteDialog(false); deletePostFn()}} color='error'>delete</Button>
              <Button onClick={e=>setDeleteDialog(false)}>save it</Button>
            </DialogActions>


          </Dialog>
      
 
    </div>
  )
}

// deletePost(post.date)
