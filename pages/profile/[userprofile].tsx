import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {getFirestore, collection, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import {Avatar, Button} from '@mui/material'
import Link from "next/link";
import { auth } from '../../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import UpdateProfile from '../../components/UpdateProfile';
import profile from '../../styles/profile.module.scss'



export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
  //uid of searched user; it appears in addres url
  const { userprofile : userUid } = router.query
  //searched user
  const [userprof, setUserprof] = useState<any>('')

  const db = getFirestore()
  const colRef = collection(db, 'users')
  const q1 = query(colRef, where("uid", "==", `${userUid}`))

  //TODO: naprawić bo nie działa
  // useEffect(()=>{
  //   console.log('eerer',userUid, user?.uid)
  //   {userUid === user?.uid &&  router.push(`/me`)}
  // }), []


    //reading data
    useEffect(()=>{

       getDocs(q1)
       .then((snapshot)=>{
         snapshot.docs.forEach(doc=>{
           setUserprof(doc.data())
          //  doc.data
         })   
       })
       .catch(err=>{
         console.error(err.message)
       })
      
    //run code inside useEffect every time when url changes
    }, [userUid])

       //updating data  (actually not needed) 
      // const q2 = query(colRef, where("uid", "==", `${user?.uid}`))

      //  function updateBio(){

      //        getDocs(q2)
      //        .then((snapshot)=>{
      //         const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
      //               updateDoc(docRef, {
      //                 bio: 'dupa'
      //               })
      //       })
      //       .catch(err=>{
      //         console.error(err.message)
      //       })

      // }


  return (
    <>
    <div className="topBarMain">d</div>
    <div className='topBarRight'>right</div>

    <div className="main">
    
    <div style={{position: 'relative'}}>
        {/* TODO: convert it to Image component */}
        <img src={userprof.banner} style={{width: '100%', height: '200px'}}></img>

        <Avatar
          id={profile.avatar}
          alt={`${userprof.displayName} avatar`}
          src={userprof.photoURL} 
          sx={{ width: 150, height: 150 }}
        />

    </div>  

    <div id={profile.editDiv} >

        <Button
         variant="outlined"
         style={{fontWeight: 'bold'}}
         id={profile.edit}>Observe</Button>

    </div>
    
    <div id={profile.infoDiv}>

      <strong>{userprof.displayName}</strong>
      <br/>
      <span>@{userprof.uid}</span>
      <br/>
      <br/>
      {userprof.bio}

    </div>


    {user?.uid===userprof.uid ? 'mój' : 'nie mój'}
 


    </div>

    <div className="rightPanel">

        <button onClick={()=>console.log()}>update bio</button>
        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
 
    </div>
    </>
  )
}
