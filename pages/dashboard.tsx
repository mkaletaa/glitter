import React from 'react'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

export default function Dashboard() {
    const [user, loading] = useAuthState(auth)
    const route = useRouter()
    if(!user) route.push('/auth/login')
  return (
    <>
       {loading ? <h1>Loading...</h1> :
        <h1>Welcome, {user?.displayName}!</h1> }
        <button onClick={()=>auth.signOut()}>sign out</button>
    </>
  )
}
