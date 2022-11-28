import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {getFirestore, collection, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import {Avatar} from '@mui/material'
import Link from 'next'
import { auth } from '../../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'




export default function Userprofile() {
  const router = useRouter()
  //logged user
  const [user, loading] = useAuthState(auth)
  //uid of searched user; it appears in addres url
  const { userprofile : userUid } = router.query
  //searched user
  const [userprof, setUserprof] = useState<any>('')

  const db = getFirestore()
  const colRef = collection(db, 'users')
  const q1 = query(colRef, where("uid", "==", `${userUid}`))

    //reading data
    useEffect(()=>{

       getDocs(q1)
       .then((snapshot)=>{
         snapshot.docs.forEach(doc=>{
           setUserprof(doc.data())
         })   
       })
       .catch(err=>{
         console.error(err.message)
       })
      
    //run code inside useEffect every time when url changes
    }, [userUid])

       //updating data   
      const q2 = query(colRef, where("uid", "==", `${user?.uid}`))

       function updateBio(){

             getDocs(q2)
             .then((snapshot)=>{
              const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
                    updateDoc(docRef, {
                      bio: 'dupa'
                    })
            })
            .catch(err=>{
              console.error(err.message)
            })

      }


  return (
    <>
    <div className="topBar"></div>
    <div className="main">
    
    {/* <Image src={userprof.photoURL} /> */}
    {/* TODO: convert it to Image component */}
    <img src={userprof.photoURL} style={{width: '100%', height: '200px'}}></img>

    {user?.uid===userprof.uid ? 'mój' : 'nie mój'}
    <br></br>
    {user?.uid}
    <Avatar
      alt={`${userprof.displayName} avatar`}
      src={userprof.photoURL} 
      sx={{ width: 120, height: 120 }}
    />

     bio:
    {userprof.bio}
    </div>

    <div className="rightPanel">
      <div>
        <button onClick={()=>updateBio()}>update bio</button>
        <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
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