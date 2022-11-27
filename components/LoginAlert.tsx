import React, {useState} from 'react'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {Button, Snackbar, Alert} from '@mui/material'
import {getFirestore, collection, getDocs, addDoc, query, where, updateDoc, doc} from 'firebase/firestore'

export default function LoginAlert() {
    const [user, loading] = useAuthState(auth)
    const googleProvider = new GoogleAuthProvider()
    const db = getFirestore()
    const colRef = collection(db, 'users')

    const GoogleLogin = async ()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider)
            // console.log('result.user',result.user)  
            
            //check if this user already exists in the database
                  getDocs(colRef)
                  .then((snapshot)=>{
                    let users:any = []
                    snapshot.docs.forEach(doc=>{
                      users.push({...doc.data(), id: doc.id})
                      console.log('doc.data', doc.data())
                    })
                    console.log('this is a list of users: ', users)
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
      addDoc(colRef, {
        uid,
        photoURL,
        displayName,
        bio: 'this is bio'
      }).then(()=>{
        //wyszukaj teraz usera po jego uid i dodaj id
        console.log('addId()')
           addId(uid)
         })
    }


    function addId(uid:string){

      const q = query(colRef, where("uid", "==", `${uid}`))
      console.log('addId2()', uid)

      getDocs(q)
      .then((snapshot)=>{
        console.log('DOC', snapshot.docs[0].id)
      
        const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
              updateDoc(docRef, {
                id: snapshot.docs[0].id
              })
      
      })
      .catch(err=>{
        console.error(err.message)
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
