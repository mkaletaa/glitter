import React, {useEffect, useState} from 'react'
import posts from '../styles/posts.module.scss'
import { collection, doc, getDocs, getFirestore, query, deleteDoc, where } from 'firebase/firestore';
import axios from 'axios'
import { useQuery } from 'react-query';
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';


export default function Posts({uid}:any) {
  const router = useRouter()
  const { userUid } = router.query

  const [user, laoding] = useAuthState(auth)
  const db = getFirestore()
  // const q = query(colRef, where("uid", "==", `${uid}`))
  const [posts, setPosts] = useState<any>('sw')


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
    onSuccess
  })

  function onSuccess(){
    console.log('POSTS', posts)
    setPosts(fetchedPosts?.data)
    if(fetchedPosts?.data!==undefined)
    setRefetchTime(0)
  }

  function deletePost(e:number){
    const db = getFirestore()
    const colRef = collection(db, `posts_${uid}`)
    const q = query(colRef, where("date", "==", e))

    getDocs(q)
    .then((snapshot)=>{
      const docRef = doc(db, `posts_${uid}`, `${snapshot.docs[0].id}`)
            deleteDoc(docRef).then(()=>refetch)
    })
  }

  return (
    <div >
      {uid}
      {/* {posts.map((post:any)=>{
        return (<div key={post.date}>{post.text}, likes: {post.likes}
       {user?.uid===uid ? <button onClick={e=>deletePost(post.date)}>delete</button> :
        <button>like</button>}
        </div>)
      }) } */}
      <br></br>
      {posts ? 'a' : 's'}
 
    </div>
  )
}
