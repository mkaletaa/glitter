import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'
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
  const userUid  = user?.uid
  //searched user
  const [userprof, setUserprof] = useState<any>('')

  //TODO: jak niezalogowany to odsyła na główną, jak zalogowany to powinien zostać
  //bo teraz go odsyła bo nie ma usera póki jest loading
  useEffect(()=>{
    !user && !loading && router.push('/')
  }, [])
  
  const db = getFirestore()
  const colRef = collection(db, 'users')
  const q1 = query(colRef, where("uid", "==", `${userUid}`))



    //reading data
    useEffect(()=>{
      fetchtDocs()
    //run code inside useEffect every time when url changes
    }, [userUid])
    
    useEffect(()=>{
      setTimeout(()=>{
    //setTimeout is needed, because, fetching data from firebase is too slow and updated
    //user data didn't appear in the UI
      fetchtDocs()
      }, 1000)
    //run code inside useEffect every time when url changes
    }, [router.query.modal])

    //TODO może tę funkcję wziąć jako useCallback zamist setTimeout
     function fetchtDocs(){
      getDocs(q1)
      .then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
          setUserprof(doc.data())
          console.log(doc.data().bio)
        })   
      })
      .catch(err=>{
        console.error(err.message)
      })
     }


  return (
    <>
    <div className="topBarMain">dd</div>
    <div className='topBarRight'>right</div>

    <div className="main">
    
    <div style={{position: 'relative'}}>
        <img src={userprof.banner} style={{width: '100%', height: '200px'}}></img>

        <Avatar
          id={profile.avatar}
          alt={`${userprof.displayName} avatar`}
          src={userprof.photoURL} 
          sx={{ width: 150, height: 150 }}
        />
    </div>  

    <div id={profile.editDiv} >
      <Link href={`/me/?modal=x`} 
      as={`/me/settings`} >
        <Button
         variant="outlined"
         style={{fontWeight: 'bold'}}
         id={profile.edit}>edit your profile</Button>
      </Link>
    </div>

      {router.query.modal && (
        <UpdateProfile user={user?.uid}/>
        )}


      <div id={profile.infoDiv}>

        <strong>{userprof.displayName}</strong>
        <br/>
        <span>@{userprof.uid}</span>
        <br/>
        <br/>
        {userprof.bio}

      </div>


      <br></br>
    {user?.uid===userprof.uid && !user && 'nie mój' }
   


    </div>

    <div className="rightPanel">
    
        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
     
    </div>
    </>
  )
}

