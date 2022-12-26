import React, {useEffect, useState} from 'react'
import posts from '../styles/posts.module.scss'
import { collection, doc, getDocs, getFirestore, query, deleteDoc, where, updateDoc } from 'firebase/firestore';
import axios from 'axios'
import { useQuery, useInfiniteQuery } from 'react-query';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Snackbar, Alert, Tooltip, CircularProgress} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link'
import Post from './Post'
import { flexbox } from '@mui/system';

//uid here is needed only to know if to display posts of specific user or all posts
export default function Posts({uid}:any) {
  const router = useRouter()
  const { userUid } = router.query
  const [deleteDialog, setDeleteDialog] = useState(false)
  //this points at a post that needs to be deleted
  const [user, laoding] = useAuthState(auth)
  const db = getFirestore()

  const [refetchTime, setRefetchTime] = useState(100)
  const {data: fetchedPosts} = useQuery('dataa', ()=>{
    if(uid!==null)
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${uid}/posts`)
    else
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/posts`)

  },{
    refetchInterval: refetchTime,
    onSuccess,
  })

  function onSuccess(){
    if(fetchedPosts?.data!==undefined )
    setRefetchTime(0)
  }


  const [deletePost, setDeletePost] = useState<number>()
  const [deletePostAuthor, setDeletePostAuthor] = useState('')
  function deletePostFn(){
    //usuwanie z obydwu baz
    const db = getFirestore()

    const docRef = doc(db, `posts/${deletePostAuthor}/posts`, `${deletePost}`)
          deleteDoc(docRef).then(()=>{setRefetchTime(10)})

    const docRef2 = doc(db, `allposts`, `${deletePost}`)
    deleteDoc(docRef2).then(()=>{setRefetchTime(10)})
  }


  const [lackUserAlert, setLackUserAlert] = useState(false)
  const [authorAlert, setAuthorAlert] = useState(false)
  const [otherAlert, setOtherAlert] = useState(false)
  function like(id:number, likes:number, author:string, isLikedBy: any){
    const db = getFirestore()

    const docRef = doc(db, `posts/${author}/posts`, `${id}`)
    const docRef2 = doc(db, `allposts`, `${id}`)


    if(!user) setLackUserAlert(true)
    else if(user.uid===author) setAuthorAlert(true)
    else  if(isLikedBy.some((a:string)=>{return (a===user.uid)}))
          {
            updateDoc(docRef,{
              likes: likes-1,
              isLikedBy: isLikedBy.filter((a:string)=>{return (a!==user.uid)})
            }).then(()=>{setRefetchTime(10)})

            updateDoc(docRef2,{
              likes: likes-1,
              isLikedBy: isLikedBy.filter((a:string)=>{return (a!==user.uid)})
            }).then(()=>{setRefetchTime(10)})
          }
    else  if(!isLikedBy.some((a:string)=>{return (a===user.uid)}))
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

  // useEffect(()=>{
  //   console.log(fetchedPosts?.data)
  // }, [fetchedPosts])

  return (
    <div >

      {(fetchedPosts?.data[0].text!==undefined)
      //false
      ? fetchedPosts?.data.map((post:any)=>{
        return (
        <div className={posts.post} key={post.id}>

             
                  <Post uid={post.uid} text={post.text} date={post.date} author={post.author} isLikeBy={post.isLikedBy} userUID={user?.uid} />
            
                  
            <div className={posts.postOptions}>    

              <span className={posts.date}>{post.date}</span>

                { !post.isLikedBy.some((a:string)=>{return (a===user?.uid)}) ?
                <><IconButton className={posts.likes} 
                onClick={e=>{like(post.id, post.likes, post.author, post.isLikedBy)}}>
                  <Tooltip title="I like it"><FavoriteBorderIcon/></Tooltip>
                </IconButton><b>{post.likes}</b> </> 
                :
                <><IconButton className={posts.likes} sx={{color: 'red'}}
                onClick={e=>{like(post.id, post.likes, post.author, post.isLikedBy)}}>
                  <Tooltip title="I don't like it"><FavoriteIcon/></Tooltip>
                </IconButton><b>{post.likes}</b> </> 
                  }

                 {  user?.uid===post.author && 
                 <IconButton 
                 onClick={e=>{setDeleteDialog(true); setDeletePost(post.id); setDeletePostAuthor(post.author)}}>
                     <Tooltip title="Delete"><DeleteIcon/></Tooltip>
                  </IconButton> }
                  
            </div>
        </div>)
      }) : 

      (refetchTime===100 && <div style={{width: '100%', display: 'flex',  }}>
      <CircularProgress sx={{margin: 'auto', marginTop: '100px'}}/>
      </div> )
      }


          <Dialog 
          open={deleteDialog}
          onClose={e=>setDeleteDialog(false)}  >
            <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
            <DialogContent>You cannot undo this action.</DialogContent>
            <DialogActions>
              <Button 
              onClick={e=>{setDeleteDialog(false); deletePostFn()}} color='error'>delete</Button>
              <Button onClick={e=>setDeleteDialog(false)} 
              variant='contained' autoFocus>save it</Button>
            </DialogActions>
          </Dialog>
      
          <Snackbar open={authorAlert || lackUserAlert || otherAlert} autoHideDuration={3000} 
          onClose={e=>{setAuthorAlert(false); setLackUserAlert(false); setOtherAlert(false)}} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={e=>{setAuthorAlert(false); setLackUserAlert(false); setOtherAlert(false)}}  severity="error" sx={{ width: '100%' }} variant="filled">
              {authorAlert && "You can't like your own posts!"}
              {lackUserAlert && "You have to sign in to like the posts"}
              {otherAlert && "Something went wrong. Try again later"}
            </Alert>
          </Snackbar>
 
    </div>
  )
}