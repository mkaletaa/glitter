import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {Avatar, Button, Dialog} from '@mui/material'
import Link from "next/link";
import { auth } from '../../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import UpdateProfile from '../../components/UpdateProfile';
import profile from '../../styles/profile.module.scss'
import {useQuery} from 'react-query'
import axios from 'axios'
import Observers from '../../components/Observers'
import Observes from '../../components/Observes'
import Posts from '../../components/Posts'

export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
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



  const [pollingTime, setPollingTime] = useState(100)
  function onSuccess(){
    if(data?.data!=="Cannot read properties of undefined (reading 'data')" 
      && data!==undefined)
      setPollingTime(0)
  }
//TODO: variable should not be in the link, try to mess with refetchInterval
    const {data, refetch, isFetching} = useQuery('data', ()=>{ 
      return axios.get(`http://localhost:3000/api/users/${user?.uid}`)
      },{
        refetchInterval: pollingTime,
        onSuccess
      })
        
  return (
    <>
    <div className="topBarMain">dd</div>
    <div className='topBarRight'>right</div>

    <div className="main">
    
    <div style={{position: 'relative'}}>
      <Link href={`/me/?banner=x`} 
        as={`/me/banner`} >
        <img src={data?.data.banner} style={{width: '100%', height: '250px'}}></img>
      </Link>

      <Link href={`/me/?avatar=x`} 
        as={`/me/avatar`} >
        <Avatar
          id={profile.avatar}
          alt={`${data?.data.displayName} avatar`}
          src={data?.data.photoURL} 
          sx={{ width: 150, height: 150 }}
        />
      </Link>
    </div>  

    {router.query.avatar && (
        <Dialog open={true} onClose={()=>router.push('/me')}>
          <img src={data?.data.photoURL} style={{width: '30vw'}}></img>
        </Dialog>
        )}

    {router.query.banner && (
        <Dialog open={true} onClose={()=>router.push('/me')}>
          <img src={data?.data.banner} style={{width: '40vw'}}></img>
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

      <div id={profile.chips}>
        <Observers isObsNr={data?.data.isObservedByNr} uid={user?.uid}/>
        <Observes obsNr={data?.data.observesNr}/>
      </div>

      {router.query.modal && (
        <UpdateProfile refetch={refetch} />
        )}



      <div id={profile.infoDiv} >

        <strong>{data?.data.displayName}</strong>
        <br/>
        <span>@{data?.data.uid}</span>
        <br/>
        <br/>
        {data?.data.bio}
        <br/>


      </div>e
      <br></br>
    {/* {user?.uid===userprof.uid && !user && 'nie mój' } */}
   <br></br>

        {/* {user?.uid && <Posts uid={user?.uid}/>} */}

    </div>

    <div className="rightPanel">
   {/* {data?.data.map((el:any)=>{return (el)})} */}
        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
     
    </div>
    </>
  )
}

