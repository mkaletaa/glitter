import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Snackbar, Alert, Tooltip, Avatar} from '@mui/material'
import axios from 'axios'
import { useQuery, useInfiniteQuery } from 'react-query';
import Link from 'next/link';
import posts from '../styles/posts.module.scss'
import {getFirestore, collection, getDoc, query, where, doc} from 'firebase/firestore'


export default function Post({uid, text}: any) {
    const db = getFirestore()
    // const colRef = collection(db, 'users')

    // const q = query(colRef, where("uid", "==", `${uid}`))
    
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    getDoc(doc(db, "users", `${uid}`)).then((snapshot) => { 
        // console.log(snapshot.data(), snapshot.id) 
            if(snapshot){
                setAvatar(snapshot?.data()?.photoURL)
                setName(snapshot?.data()?.displayName)
            }

      });

    // getDocs(q)
    // .then((snapshot)=>{
    //     // res.status(201).json(snapshot.docs[0].data())
    //     if(snapshot.docs[0].data() === undefined)
    //         console.log('undefined')
    //         else
    //         // res.status(201).json(req.query.userid)
    //         {
    //             setAvatar(snapshot.docs[0].data().photoURL)
    //             setName(snapshot.docs[0].data().displayName)
    //         }
    //     })
    //     .catch(err=>{
    //         console.log(err.message)
    //     })
    // const [refetchTime, setRefetchTime] = useState(100)
    // const {data: fetchedUser} = useQuery('fetchedUser', ()=>{
    //   return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${uid}`)
    //   // return axios.get(`http://localhost:3000/api/users/${uid}`)
    // },{
    //   refetchInterval: refetchTime,
    //   onSuccess,
    // })
  
    // function onSuccess(){
    //     console.log('AUTHOR',fetchedUser?.data, uid )
    //   if(fetchedUser?.data!==undefined)
    //   setRefetchTime(0)
    // }



    
  return (
        <>
            <div className={posts.postContent}>

                <Link className={posts.postAvatar}
                    href={`/profile/${uid}`}>
                         {/* {fetchedUser?.data} */}
                    <Avatar
                      src={avatar} 
                      // src={fetchedUser?.data.photoURL} 
                      sx={{ width: 50, height: 50 }}
                    />
                </Link>

                <Link href={`/profile/${uid}`}>
                  <strong>{name}</strong> 
                  {/* <strong>{fetchedUser?.data.displayName}</strong>  */}
                </Link>

                <span>@{uid}</span>
                <p style={{fontSize: text.length<=50 ? '30px' : '20px' }}>
                {text}</p>
          
          </div>

    </>
  )
}






  

    

