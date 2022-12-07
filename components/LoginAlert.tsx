import React, {useEffect, useState} from 'react'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {Button, Snackbar, Alert} from '@mui/material'
import {getFirestore, collection, getDocs, setDoc, query, where, updateDoc, doc} from 'firebase/firestore'

export default function LoginAlert() {
    const [user, loading] = useAuthState(auth)
    const googleProvider = new GoogleAuthProvider()
    const db = getFirestore()
    const colRef = collection(db, 'users')
    

    const GoogleLogin = async ()=>{
      try{
        const result = await signInWithPopup(auth, googleProvider)

                  getDocs(colRef)
                  .then((snapshot)=>{
                    let users:any = []
                    snapshot.docs.forEach(doc=>{
                      users.push({...doc.data(), id: doc.id})
                    })

                    const isUser = users.some((a:any)=>{return a.uid===result.user.uid})

                    //if user does not exist in the DB add them 
                    if(!isUser){
                      const uid = result.user.uid
                      const photoURL = result.user.photoURL
                      const displayName = result.user.displayName
                      addUserToDb({uid, photoURL, displayName})
                    }
                  })
                  .catch(err=>{
                    console.error(err.message)
                  })

        }
        catch(err){
            console.error(err)
        }
    } 

    type addUserType = {
      uid: string,
      photoURL: string | null,
      displayName: string | null
    }

    function addUserToDb({uid, photoURL, displayName}: addUserType){

      console.log(uid, photoURL, displayName)
      setDoc(doc(db, 'users', `${uid}`),{
        uid,
        photoURL,
        displayName,
        bio: 'this is bio',
        banner: 'https://t4.ftcdn.net/jpg/00/99/16/73/360_F_99167308_3p5oJqnG1EatfGL4X2iJ0C9h4dRy03it.jpg',
        observes: [],
        observesNr: 0,
        isObservedBy: [],
        isObservedByNr: 0
      })
    }



  
  return (
    <>
    {!user && !loading &&
        <Snackbar  
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Note archived">
          
            <Alert severity='info' style={{fontSize: '18px'}}>
              Join the Glitter community with just one click &nbsp;
              <Button 
              onClick={GoogleLogin} 
              variant="contained"
              style={{display: 'inline-block'}}>
              Sign up / Sign in</Button> 
            </Alert>
          </Snackbar >
         }
    </>
  )
}
