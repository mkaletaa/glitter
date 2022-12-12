import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Snackbar, Alert, Tooltip, Avatar} from '@mui/material'
import axios from 'axios'
import { useQuery, useInfiniteQuery } from 'react-query';
import Link from 'next/link';
import posts from '../styles/posts.module.scss'
import {getFirestore, collection, getDoc, query, where, doc} from 'firebase/firestore'


export default function Post({uid, text}: any) {
    const db = getFirestore()    
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    getDoc(doc(db, "users", `${uid}`)).then((snapshot) => { 
            if(snapshot){
                setAvatar(snapshot?.data()?.photoURL)
                setName(snapshot?.data()?.displayName)
            }
      });
    
  return (
        <>
            <div className={posts.postContent}>

                <Link className={posts.postAvatar}
                    href={`/profile/${uid}`}>
                      
                    <Avatar
                      src={avatar} 
                      sx={{ width: 50, height: 50 }}
                    />
                </Link>

                <Link href={`/profile/${uid}`}>
                  <strong>{name}</strong> 
                </Link>

                <span>@{uid}</span>
                <p style={{fontSize: text.length<=50 ? '30px' : '20px' }}>
                {text}</p>
          
          </div>

    </>
  )
}






  

    

