import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import {getFirestore, collection, getDocs, addDoc, query, where} from 'firebase/firestore'
import {Avatar} from '@mui/material'


export default function Userprofile() {
  const router = useRouter()
  const { userprofile : userUid } = router.query
  //profile of searched person
  const [userprof, setUserprof] = useState<any>('')

  const db = getFirestore()
  const colRef = collection(db, 'users')
  const q = query(colRef, where("uid", "==", `${userUid}`))

       getDocs(q)
       .then((snapshot)=>{
         snapshot.docs.forEach(doc=>{
           setUserprof(doc.data())
         })   
       })
       .catch(err=>{
         console.error(err.message)
       })


  return (
    <>
    <div className="topBar"></div>
    <div className="main">
    
    <Avatar
      alt="Remy Sharp"
      src={userprof.photoURL} 
      sx={{ width: 120, height: 120 }}
    />

    {userprof.photoURL}  
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