import React, {useEffect, useState} from 'react'
import posts from '../styles/posts.module.scss'
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import axios from 'axios'
import { useQuery } from 'react-query';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'


export default function Posts({uid}:any) {
  const [user, laoding] = useAuthState(auth)
  const db = getFirestore()
  const colRef = collection(db, 'posts')
  const q = query(colRef, where("uid", "==", `${uid}`))
  const [posts, setPosts] = useState<any>({date: 123123123, content: 'sds'})

  getDocs(q)
  .then((snapshot)=>{
      if(snapshot.docs[0].data() !== undefined)
         {
          // console.log('DATAAA', snapshot.docs[0].data()[1670159330206].date)
          setPosts(snapshot.docs[0].data())
         }
      })
      
useEffect(()=>{
  // console.warn(posts)
}, [posts])


  return (
    <div 
    >Posts
      {/* {posts && posts.map((post:any)=>{return (<div key={post.date}>{post.content}</div>)})} */}

      {/* {posts.map((a:any)=>{return (<div key={a.date}>{a.content}</div>)})} */}
    </div>
  )
}
