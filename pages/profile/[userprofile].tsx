import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { execFile } from 'child_process'

import {users} from '../../data/users'
import { isContext } from 'vm'

export default function Userprofile() {
  const router = useRouter()
  const { userprofile : userUid } = router.query
  const [users, setUsers] = useState([])

  // getAuth()
  // .getUser(userUid)
  // .then((userRecord:any) => {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  // })
  // .catch((error:any) => {
  //   console.log('Error fetching user data:', error);
  // });

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
      console.log('fdfdf')
    }
    fetchUsers()
  }, [])

  useEffect(()=>{
    console.log(users[0])
  }, [users])
  
  
  const variable = process.env.DB_VARIABLE
  console.log(variable, 'varoable')
  return (
    <>
    <div className="topBar"></div>
    <div className="main">
ee
      {
          users.map((a:any)=>{return (<li key={Date.now()}>{a[0]}</li>)})
        }
      
    </div>

    <div className="rightPanel">
      <div>
        de
      </div>
    </div>
    </>
  )
}


// export async function getStaticPaths(){
//   return{
//    paths: [
//       {params: {userId: '1'}},
//       {params: {userId: '2'}},
//       {params: {userId: '3'}},
//     ],
//     fallback: false
//   }
// }

// export async function getStaticProps(context:any){
//   const {params} = context
//   const {userId} = params

//   const user = users.find((user)=>user.uid===parseInt(userId))
// }