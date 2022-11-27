import React, {useState} from 'react'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'

export default function Dashboard() {
    const [user, loading] = useAuthState(auth)
    const route = useRouter()
    if(!user && !loading) route.push('/auth/login')

    const [users, setUsers] = useState([])
 
  const fetchUsers = async ()=>{
    const response = await fetch('/api/users')
    const data = await response.json()
    setUsers(data)
  }

        const registerUser = async ()=>{
          // console.warn(user)
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify([user?.uid, user?.displayName, user?.photoURL, 'this is bio']),
            headers: {
              'Contrnt-Type': 'application/json',
            },
          })
          const data = await response.json()
          // console.warn(JSON.stringify({user}))
        }

  

  return (
    <>
     <div className='topBar'>cececec</div>

    <div className="main">
       {loading ? <p>Loading...</p> :
        <h1>Welcome, {user?.displayName}!</h1> }
        {
          users.map((a:any)=>{return (<li key={a.uid}>{a.displayName}, {a.photoURL}</li>)})
        }
    </div>

    <div className="rightPanel">
      <div>
        <button onClick={()=>auth.signOut()}>sign out</button>
        <Skeleton
          sx={{ bgcolor: 'grey.500' }}
          variant="rounded"
          width={210}
          height={118}
        />
        <button onClick={()=>route.push(`profile/${user?.displayName}`)}>profile</button>

        <button onClick={e=>fetchUsers()}>GET</button>
        <button onClick={e=>registerUser()}>Post</button>

      </div>
    </div>
    </>
  )
}
