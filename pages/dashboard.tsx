import React, {useEffect} from 'react'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'

export default function Dashboard() {
    const [user, loading] = useAuthState(auth)
    const route = useRouter()

 
        if(!user && !loading) route.push('/auth/login')
  
        console.log(user)

  return (
    <>
       {loading ? <p>Loading...</p> :
        <h1>Welcome, {user?.displayName}!</h1> }
        <button onClick={()=>auth.signOut()}>sign out</button>
        <Skeleton
          sx={{ bgcolor: 'grey.500' }}
          variant="rounded"
          width={210}
          height={118}
        />
        <button onClick={()=>route.push(`profile/${user?.displayName}`)}>profile</button>
    </>
  )
}
