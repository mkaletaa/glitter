import React, {useEffect, useState} from 'react'
import posts from '../styles/posts.module.scss'
import { collection, doc, getDocs, getFirestore, query, deleteDoc, where, updateDoc } from 'firebase/firestore';
import axios from 'axios'
import { useQuery } from 'react-query';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Snackbar, Alert} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Posts({uid}:any) {
  const router = useRouter()
  const { userUid } = router.query
  const [deleteDialog, setDeleteDialog] = useState(false)
  //this points at a post that needs to be deleted
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

  function deletePostFn(){
    const db = getFirestore()
    const colRef = collection(db, `posts_${uid}`)
    const q = query(colRef, where("date", "==", deletePost))

    getDocs(q)
    .then((snapshot)=>{
      const docRef = doc(db, `posts_${uid}`, `${snapshot.docs[0].id}`)
            deleteDoc(docRef).then(()=>{setRefetchTime(10)})
    })
  }

  const [lackUserAlert, setLackUserAlert] = useState(false)
  const [authorAlert, setAuthorAlert] = useState(false)
  const [otherAlert, setOtherAlert] = useState(false)
  function like(e:number, likes:number, author:string, isLikedBy: any){
    const db = getFirestore()
    const colRef = collection(db, `posts_${uid}`)
    const q = query(colRef, where("date", "==", e))

    if(!user) setLackUserAlert(true)
    else if(user.uid===author) setAuthorAlert(true)
    else  if(isLikedBy.some((a:string)=>{return (a===user.uid)}))
    getDocs(q)
    .then((snapshot)=>{
      const docRef = doc(db, `posts_${uid}`, `${snapshot.docs[0].id}`)
            updateDoc(docRef,{
              likes: likes-1,
              isLikedBy: isLikedBy.filter((a:string)=>{return (a!==user.uid)})
            }).then(()=>{setRefetchTime(10)})
    })
    else  if(!isLikedBy.some((a:string)=>{return (a===user.uid)}))
    getDocs(q)
    .then((snapshot)=>{
      const docRef = doc(db, `posts_${uid}`, `${snapshot.docs[0].id}`)
            updateDoc(docRef,{
              likes: likes+1,
              isLikedBy: [...isLikedBy, user.uid]
            }).then(()=>{setRefetchTime(10)})
    })
    else setOtherAlert(true)
  }

  return (
    <div >

      {fetchedPosts?.data[0].text ? fetchedPosts.data.map((post:any)=>{
        return (
        <div key={post.date}>{post.text}
           {  user?.uid===uid && 
            <IconButton 
            onClick={e=>{setDeleteDialog(true); setDeletePost(post.date)}}>
                <DeleteIcon/>
              </IconButton> }
         
                { !post.isLikedBy.some((a:string)=>{return (a===user?.uid)}) ?
                <><IconButton className={posts.likes} 
                onClick={e=>{like(post.date, post.likes, post.author, post.isLikedBy)}}>
                  <FavoriteBorderIcon/> 
                </IconButton>{post.likes} </> 
                :
                <><IconButton className={posts.likes} sx={{color: 'red'}}
                onClick={e=>{like(post.date, post.likes, post.author, post.isLikedBy)}}>
                  <FavoriteIcon/> 
                </IconButton>{post.likes} </> 
                  }
                           
            
        </div>)
      }) : null}


          <Dialog 
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
      
          <Snackbar open={authorAlert || lackUserAlert || otherAlert} autoHideDuration={3000} 
          onClose={e=>{setAuthorAlert(false); setLackUserAlert(false); setOtherAlert(false)}} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={e=>{setAuthorAlert(false); setLackUserAlert(false); setOtherAlert(false)}}  severity="error" sx={{ width: '100%' }} variant="filled">
              {authorAlert && "You can't like your own post!"}
              {lackUserAlert && "You have to sign in to like the posts"}
              {otherAlert && "Something went wrong. Try again later"}
            </Alert>
          </Snackbar>
 
    </div>
  )
}

// deletePost(post.date)
