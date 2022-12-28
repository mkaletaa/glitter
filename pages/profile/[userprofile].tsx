import { Avatar, Button, Skeleton } from '@mui/material';
import axios from 'axios';
import { doc, getFirestore, updateDoc} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase-config';
import { useQuery } from 'react-query';
import Observers from '../../components/Observers';
import Observes from '../../components/Observes';
import Posts from '../../components/Posts'
import profile from '../../styles/profile.module.scss';

export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
  //uid of searched user; it appears in addres url
  const { userprofile : userUid } = router.query
  //nr of follows
  const [obsNr, setObsNr] = useState(0)
  //nr of followers
  const [isObsNr, setIsObsNr] = useState(0)
  const [showFolBtn, setFolBtn] = useState(false)


  useEffect(()=>{
    setPollingTime(100)

    if(userUid===user?.uid && userUid!==undefined && loading===false )
    {userUid === user?.uid &&  router.push(`/me`)}
  }, [loading, router])
  
  // useEffect(()=>{
  //   setPollingTime(100)
  // }, [router])

  /////////////
  const [pollingTime, setPollingTime] = useState<number>(1000)
  //feching data about user to know if they observe the profile
  const {isLoading , data} = useQuery('data', ()=>{ 
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${user?.uid}`)
    },{
      refetchInterval: pollingTime,
      onSuccess,
    })

   function onSuccess(){
    if(userData?.data!=="Cannot read properties of undefined (reading 'data')" 
      && userData!==undefined
      && data?.data!=="Cannot read properties of undefined (reading 'data')"
      && data!==undefined 
      ){

      if(data?.data.uid!==userUid && data?.data.uid!==undefined){
      let x = data?.data.observes.some((a:any)=>{return (a===userData?.data.uid)})
      // console.log('q')
      setFolBtn(x)}
      setPollingTime(100)
      setIsObsNr(userData?.data.isObservedByNr)
      setObsNr(userData?.data.observesNr)
      setTimeout(()=>{
        setPollingTime(0)
      }, 1000)
    }
  }
    
   const {isLoading: userIsLoading , data: userData} = useQuery('userData', ()=>{ 
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${userUid}`)
    },
    {
      refetchInterval: pollingTime,
      onSuccess,
    })
///////////////////////////////

const db = getFirestore()
   //this function updates user's account data
  function follow(){
    const docRef = doc(db, `users`, `${user?.uid}`)
    updateDoc(docRef,{
      observes: [...data?.data.observes, userData?.data.uid],
            observesNr: data?.data.observesNr+1
    }).then(()=>setPollingTime(100))

    const docRef2 = doc(db, `users`, `${userData?.data.uid}`)
    updateDoc(docRef2,{
      isObservedBy: [...userData?.data.isObservedBy, user?.uid],
      isObservedByNr: userData?.data.isObservedByNr+1
    }).then(()=>setPollingTime(100))
   }
   

   function unfollow(){
     const docRef = doc(db, `users`, `${user?.uid}`)
     updateDoc(docRef,{
       observes: data?.data.observes.filter((a:string)=>{
                      return(a!==userData?.data.uid)
                    }),
             observesNr: data?.data.observesNr-1
     }).then(()=>setPollingTime(1000))
    //  setPollingTime(1000)
     const docRef2 = doc(db, `users`, `${userData?.data.uid}`)
     updateDoc(docRef2,{
       isObservedBy: userData?.data.isObservedBy.filter((a:string)=>{
                return(a!==data?.data.uid)
            }),
       isObservedByNr: userData?.data.isObservedByNr-1
     }).then(()=>setPollingTime(1000))
   }

    
  return (
    <>
    <div className="topBarMain">{userData?.data.displayName}</div>
    <div className='topBarRight'></div>

    <div className="main">
    
    <div style={{position: 'relative'}}>

      { userIsLoading ?
        <Skeleton
        variant="rectangular"
        sx={{ bgcolor: 'grey' }}
        style={{width: '100%', height: '200px'}}
        animation='wave'
      />
    
           :
    
        <img id={profile.banner} src={userData?.data.banner}></img>
      }

       { userIsLoading ?
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
          alt={`${userData?.data.displayName} avatar`}
          src={userData?.data.photoURL} 
        />  }

    </div>  

    <div id={profile.editDiv} >

       {user  && !showFolBtn && <Button
         variant="contained"
         style={{fontWeight: 'bold'}}
         id={profile.edit}
         onClick={e=>{follow();}}>Follow</Button>}
            <br/>
            <br/>
       {user && showFolBtn && <Button
         variant="outlined"
         style={{fontWeight: 'bold'}}
         id={profile.edit}
         onClick={e=>{unfollow();}}>Unfollow</Button>}
    </div>
    
    {!userIsLoading && <div id={profile.chips}>
        <Observers isObsNr={isObsNr} uid={userData?.data.uid}/>
        <Observes obsNr={obsNr}/>
      </div>}
      
    <div id={profile.infoDiv}>

      {userIsLoading ?
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
        <strong>{userData?.data.displayName}</strong>
        <span>@{userData?.data.uid}</span>
        <p>{userData?.data.bio}</p>
      </>
      }

    </div>
     {userData?.data.uid && <Posts uid={userData?.data.uid}/>}
    </div>

    </>
  )
}