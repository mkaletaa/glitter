import React, {useEffect, useState} from 'react'
import posts from '../styles/posts.module.scss'
import { collection, getDoc, doc, getDocs, getFirestore, query, deleteDoc, where, updateDoc } from 'firebase/firestore';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Snackbar, Alert, Tooltip, CircularProgress} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Post from './Post'
import useLikePost from '../utils/custom-hooks/useLikePost'
import useDeletePost from '../utils/custom-hooks/useDeletePost'

//uid here is needed only to know if to display posts of specific user or all posts
export default function Posts({uid}:any) {
  const router = useRouter()
  const { userUid } = router.query
  const [deleteDialog, setDeleteDialog] = useState(false)
  //this points at a post that needs to be deleted
  const [user, laoding] = useAuthState(auth)

  const [spinning, setSpinning] = useState(true)
  const db = getFirestore()
  const [fetchedPosts, setFetchedPosts] = useState<any>('')
  

  function postsfn(){
    const query1  = collection(db, `allposts`)
    const query2  = collection(db, `posts/${uid}/posts`)

    if(uid!==null) setSpinning(false)

    getDocs(uid===null ? query1 : query2)
    .then((snapshot)=>{
    let posts:any = []
    if(snapshot.docs[0].data() === undefined){
    setSpinning(true)
    setFetchedPosts([undefined])
    setSpinning(false)
  }
  else{
    setSpinning(true)
      snapshot.docs.forEach(doc=>{
        posts.push(doc.data())
      })
      setSpinning(false)
      setFetchedPosts(posts)}
      })
      .catch(err=>{
          console.error(err.message)
      })
      // setSpinning(false)
    }
    
    useEffect(()=>{
      setFetchedPosts([undefined])
      setSpinning(true)
    postsfn()
  }, [uid])
 

  const {deletePostFn, setDeletePost, setDeletePostAuthor } = useDeletePost(postsfn)

  const {like, lackUserAlert, authorAlert, otherAlert, setLackUserAlert, setAuthorAlert, setOtherAlert} = useLikePost(postsfn)

  return (
    <div >
      {fetchedPosts[0]!==undefined

      ?
      
      fetchedPosts.map((post:any)=>{
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
    </div>
        )
      })
    
      :
    
      (spinning && 
      <div style={{width: '100%', display: 'flex',  }}>
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