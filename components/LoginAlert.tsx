import React, {useEffect, useState} from 'react'
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
        
        //check if this user already exists in the database
        //nie działa chyba dlatego, że q powstaje zanim powstanie result
        // const q =  query(colRef, where("uid", "==", `${result.user.uid}`))
        // getDocs(q)
        // .then((snapshot)=>{
        //             snapshot.docs.forEach(doc=>{
        //               if(snapshot.docs[0]===undefined){
        //                   alert('adiing1')

        //                 const uid = result.user.uid
        //                 const photoURL = result.user.photoURL
        //                 const displayName = result.user.displayName
        //                 addUserToDb({uid, photoURL, displayName})
        //               }
        //             })   
        //           })
        //           .catch(err=>{
        //             console.error(err.message)
        //           })
            
            //check if this user already exists in the database
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
      alert('adiing')
      addDoc(colRef, {
        uid,
        photoURL: 'https://avatars.githubusercontent.com/u/20715958?v=4',
        displayName,
        bio: 'this is bio',
        banner: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        observes: [],
        observesNr: 0,
        isObservedBy: [],
        isObservedByNr: 0
      }).then(()=>{
        //wyszukaj teraz usera po jego uid i dodaj id
           addId(uid)
         })
    }


    function addId(uid:string){

      const q = query(colRef, where("uid", "==", `${uid}`))

      getDocs(q)
      .then((snapshot)=>{
      
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
