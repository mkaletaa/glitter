import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'
import {Avatar, Button, Dialog} from '@mui/material'
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

  useEffect(()=>{
    {!user && !loading && router.push('/')}
  }, [])
  
  useEffect(()=>{
    {userprof.uid && router.push(`/profile/${userprof.uid}`)}
  }, [user])
  
  useEffect(()=>{
    {!user && !loading && router.push('/')}
  }, [loading])



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
          console.log('ss',db)
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
      <Link href={`/me/?banner=x`} 
        as={`/me/banner`} >
        <img src={userprof.banner} style={{width: '100%', height: '250px'}}></img>
      </Link>

      <Link href={`/me/?avatar=x`} 
        as={`/me/avatar`} >
        <Avatar
          id={profile.avatar}
          alt={`${userprof.displayName} avatar`}
          src={userprof.photoURL} 
          sx={{ width: 150, height: 150 }}
        />
      </Link>
    </div>  

    {router.query.avatar && (
        <Dialog open={true} onClose={()=>router.push('/me')}>
          <img src={userprof.photoURL} style={{width: '30vw'}}></img>
        </Dialog>
        )}

    {router.query.banner && (
        <Dialog open={true} onClose={()=>router.push('/me')}>
          <img src={userprof.banner} style={{width: '40vw'}}></img>
        </Dialog>
        )}

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

