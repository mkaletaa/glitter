import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {Avatar, Button, Skeleton} from '@mui/material'
import Link from "next/link";
import { auth } from '../../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {getFirestore, collection, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import profile from '../../styles/profile.module.scss'
import { useQuery } from 'react-query';
import axios from 'axios'
import Observers from '../../components/Observers'

export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
  //uid of searched user; it appears in addres url
  const { userprofile : userUid } = router.query
  const [refetch, setRefetch] = useState<number>(100)
  const [obsNr, setObsNr] = useState(0)
  // useEffect(()=>{
  //   console.log('eerer',userUid, user?.uid)
  //   if(userUid===user?.uid && userUid!==undefined )
  //   {userUid === user?.uid &&  router.push(`/me`)}
  // }, [])

  useEffect(()=>{
    console.log('eerer',userUid, user?.uid)
    if(userUid===user?.uid && userUid!==undefined && loading===false )
    {userUid === user?.uid &&  router.push(`/me`)}
  }, [loading])



  
   
  const {isLoading , data} = useQuery('data', ()=>{ 
    return axios.get(`http://localhost:3000/api/users/${userUid}`)
    },
    {
      refetchInterval: refetch
    })

   useEffect(()=>{
    if(data?.data!=="Cannot read properties of undefined (reading 'data')" && data!==undefined)
    setRefetch(0)
    setObsNr(data?.data.observesNr)
   },[data])
    
   //this function updates user's account data
    function observe(){
      console.log('ss')
      const db = getFirestore()
      const colRef = collection(db, 'users')
      const q2 = query(colRef, where("uid", "==", `${user?.uid}`))
     
      getDocs(q2)
      .then((snapshot)=>{
        console.log(snapshot.docs[0].data().observes)

       const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
             updateDoc(docRef, {
               observes: [...snapshot.docs[0].data().observes, 
               {displayName: data?.data.displayName,
                uid:data?.data.uid,
                id:data?.data.id,
                photoURL:data?.data.photoURL}
              ],
              observesNr: snapshot.docs[0].data().observesNr+1
             })
     })
     .catch(err=>{
       console.error(err.message)
     })

    }

    
  return (
    <>
    <div className="topBarMain">d</div>
    <div className='topBarRight'>right</div>

    <div className="main">
    
    <div style={{position: 'relative'}}>
        {/* TODO: convert it to Image component */}

      { isLoading ?
        <Skeleton
        variant="rectangular"
        sx={{ bgcolor: 'grey' }}
        style={{width: '100%', height: '200px'}}
        animation='wave'
      />
    
           :
    
        <img src={data?.data.banner} style={{width: '100%', height: '250px'}}></img>
      }

       { isLoading ?
            <Skeleton
            id={profile.avatar}
            sx={{ bgcolor: 'grey.500' }}
            variant="circular"
            width={150}
            height={150}
            animation='wave'
          />

          :

        <Avatar
          id={profile.avatar}
          alt={`${data?.data.displayName} avatar`}
          src={data?.data.photoURL} 
          sx={{ width: 150, height: 150 }}
        />  }

    </div>  

    <div id={profile.editDiv} >

       {user && <Button
         variant="outlined"
         style={{fontWeight: 'bold'}}
         id={profile.edit}
         onClick={e=>observe()}>Follow</Button>}

    </div>
    
    <div id={profile.infoDiv}>

      {isLoading ?
      <>
        <Skeleton sx={{ bgcolor: 'grey' }} style={{width: '50%'}} >
        </Skeleton>
        <Skeleton sx={{ bgcolor: 'grey' }} style={{width: '40%'}} >
        </Skeleton>
        <br/>
        <Skeleton sx={{ bgcolor: 'grey' }} style={{width: '100%', height: '40px'}} >
        </Skeleton>

      </>
      :
      <>
        <strong>{data?.data.displayName}</strong>

        <br/>
        <span>@{data?.data.uid}</span>
        <br/>
        <br/>
        {data?.data.bio}
      </>
      }

      <br></br>
    <Observers obsNr={obsNr}/>
    </div>
    { data?.data.observesNr}
    <br/>

    {user?.uid===data?.data.uid ? 'mój' : 'nie mój'}
 


    </div>

    <div className="rightPanel">

        <button onClick={()=>console.log()}>update bio</button>
        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
 
    </div>
    </>
  )
}