import { Avatar, Button, Skeleton } from '@mui/material';
import axios from 'axios';
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import Observers from '../../components/Observers';
import Observes from '../../components/Observes';
import Posts from '../../components/Posts'
import profile from '../../styles/profile.module.scss';
import { auth } from '../../utils/firebase-config';

export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
  //uid of searched user; it appears in addres url
  const { userprofile : userUid } = router.query
  const [refetch, setRefetch] = useState<number>(100)
  //nr of follows
  const [obsNr, setObsNr] = useState(0)
  //nr of followers
  const [isObsNr, setIsObsNr] = useState(0)
  const [showFolBtn, setFolBtn] = useState(true)


  useEffect(()=>{
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
    setTimeout(()=>{
      setRefetch(0)
    }, 1000)
    setIsObsNr(data?.data.isObservedByNr)
    setObsNr(data?.data.observesNr)

   },[data])
    
   const {isLoading: userIsLoading , data: userData} = useQuery('userData', ()=>{ 
    return axios.get(`http://localhost:3000/api/users/${user?.uid}`)
    },
    {
      refetchInterval: refetch
    })


    useEffect(()=>{
         //check if user follows this account or not
         if(!isLoading && userData && userData?.data!=="Cannot read properties of undefined (reading 'data')"){
         let x = userData?.data.observes.some((a:string)=>{return (a===data?.data.uid)})
         setFolBtn(x)
        }

    }, [userData, isLoading])

   //this function updates user's account data
   const db = getFirestore()
   const colRef = collection(db, 'users')
   const q1 = query(colRef, where("uid", "==", `${user?.uid}`))

    function observe(){   
      getDocs(q1)
      .then((snapshot)=>{
       const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
             updateDoc(docRef, {
              observes: [...snapshot.docs[0].data().observes, data?.data.uid],
              observesNr: snapshot.docs[0].data().observesNr+1
             })
     })
     .catch(err=>{
       console.error(err.message)
     })

    }

    ///this function updates account of a user who we visit
    function addFolower(){
      const q2 = query(colRef, where("uid", "==", `${data?.data.uid}`))
      getDocs(q2)
      .then((snapshot)=>{
       const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
    
       setIsObsNr(prev=>prev+1)
             updateDoc(docRef, {
              isObservedBy: [...snapshot.docs[0].data().isObservedBy, user?.uid],
              isObservedByNr: snapshot.docs[0].data().isObservedByNr+1
             })
             observe()
     })
     .catch(err=>{
       console.error(err.message)
     })

    }

    ///this function updates account of a user who we visit
    function removeFolower(){
      const q2 = query(colRef, where("uid", "==", `${data?.data.uid}`))
      getDocs(q2)
      .then((snapshot)=>{
       const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)

       setIsObsNr(prev=>prev-1)
             updateDoc(docRef, {
              isObservedBy: snapshot.docs[0].data().isObservedBy.filter((a:string)=>{
                return(a!==user?.uid)
              }),
              isObservedByNr: snapshot.docs[0].data().isObservedByNr-1
             })
             unobserve()
     })
     .catch(err=>{
       console.error(err.message)
     })
    }

   //this function updates user's account data
    function unobserve(){
      getDocs(q1)
      .then((snapshot)=>{

       const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
             updateDoc(docRef, {
              observes: snapshot.docs[0].data().observes.filter((a:string)=>{
                return(a!==data?.data.uid)
              }),
              observesNr: snapshot.docs[0].data().observesNr-1
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

       {user  && !showFolBtn && <Button
         variant="contained"
         style={{fontWeight: 'bold'}}
         id={profile.edit}
         onClick={e=>{addFolower(); setFolBtn(prev=>!prev)}}>Follow</Button>}
            <br/>
            <br/>
       {user && showFolBtn && <Button
         variant="outlined"
         style={{fontWeight: 'bold'}}
         id={profile.edit}
         onClick={e=>{removeFolower(); setFolBtn(prev=>!prev)}}>Unfollow</Button>}
    </div>
    
    <div id={profile.chips}>
        <Observers isObsNr={isObsNr} uid={data?.data.uid}/>
        <Observes obsNr={obsNr}/>
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
      
    </div>
    
    <br/>

    {user?.uid===data?.data.uid ? 'mój' : 'nie mój'}
 

      <Posts/>
    </div>

    <div className="rightPanel">

        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
 
    </div>
    </>
  )
}