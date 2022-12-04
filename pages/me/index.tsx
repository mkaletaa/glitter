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

export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
  //searched user
  const [userprof, setUserprof] = useState<any>('')

  const [refetch, setRefetch] = useState<number>(100)

  useEffect(()=>{
    {!user && !loading && router.push('/')}
  }, [])
  
  useEffect(()=>{
    {userprof.uid && router.push(`/profile/${userprof.uid}`)}
  }, [user])
  
  useEffect(()=>{
    {!user && !loading && router.push('/')}
  }, [loading])




//TODO: as user id not defined right after page reload maybe it would be a good idea 
//to implement redux and store info about logged user so there is no need to use 
//delayed useAuth every time page reloads
    const {data} = useQuery('data', ()=>{ 
      return axios.get(`http://localhost:3000/api/users/${user?.uid}`)
      },
      {
        refetchInterval: refetch
      })

      useEffect(()=>{
        if(data?.data!=="Cannot read properties of undefined (reading 'data')" && data!==undefined)
        setRefetch(0)
       },[data])



// useEffect(()=>{
//   const {data} = useQuery('data', ()=>{ 
//     return axios.get(`http://localhost:3000/api/users/${user?.uid}`)
//     })
// }, [router.query.modal])

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

      {router.query.modal && (
        <UpdateProfile />
        )}


      <div id={profile.infoDiv}>

        <strong>{data?.data.displayName}</strong>
        <br/>
        <span>@{data?.data.uid}</span>
        <br/>
        <br/>
        {data?.data.bio}
        <br/>

        <Observers isObsNr={data?.data.isObservedByNr}/>
        <Observes obsNr={data?.data.observesNr}/>

      </div>e
      <br></br>
    {/* {user?.uid===userprof.uid && !user && 'nie mój' } */}
   <br></br>



    </div>

    <div className="rightPanel">
   {/* {data?.data.map((el:any)=>{return (el)})} */}
        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
     
    </div>
    </>
  )
}

