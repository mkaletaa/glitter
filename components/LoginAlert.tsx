import React, {useEffect, useState} from 'react'
import { auth } from '../utils/firebase-config'
import {getAuth} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {Button, Snackbar, Alert, CardContent} from '@mui/material'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore'

export default function LoginAlert() {
    const [user, loading] = useAuthState(auth)
    const [userData, setUserData] = useState([])

    const googleProvider = new GoogleAuthProvider()
    const db = getFirestore()
    const colRef = collection(db, 'users')

    const GoogleLogin = async ()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider)
            console.log('result.user',result.user)  
            
            getDocs(colRef)
            .then((snapshot)=>{
              let users:any = []
              snapshot.docs.forEach(doc=>{
                users.push({...doc.data(), id: doc.id})
              })
              console.log('this is a list of users: ', users)
              const isUser = users.some((a:any)=>{return a.uid===result.user.uid})
              
            })
            .catch(err=>{
              console.log(err.message)
            })

            if(result.user){
            const uid = result.user.uid
            const photoURL = result.user.photoURL
            const displayName = result.user.displayName

            // addUserToDb(uid, photoURL, displayName)
          }
        }
        catch(err){
            console.log(err)
        }
    } 

    function addUserToDb(uid:string, photoURL:string | null, displayName:string | null){
      addDoc(colRef, {
        uid: uid,
        photoURL: photoURL,
        displayName
      })
    }
    //getAuth()
    // .getUser(user?.uid)
    // .then((userRecord:any) => {
    //   // See the UserRecord reference doc for the contents of userRecord.
    //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    // })
    // .catch((error:any) => {
    //   console.log('Error fetching user data:', error);
    // });


    
    // const listAllUsers = (nextPageToken:any) => {
    //   // List batch of users, 1000 at a time.
    //   getAuth()
    //     .listUsers(1000, nextPageToken)
    //     .then((listUsersResult:any) => {
    //       listUsersResult.users.forEach((userRecord:any) => {
    //         console.log('user', userRecord.toJSON());
    //       });
    //       if (listUsersResult.pageToken) {
    //         // List next batch of users.
    //         listAllUsers(listUsersResult.pageToken);
    //       }
    //     })
    //     .catch((error:any) => {
    //       console.log('Error listing users:', error);
    //     });
    // };
    // // Start listing users from the beginning, 1000 at a time.
    // listAllUsers(true);


  return (
    <>
    {!user && !loading &&
        <Snackbar  
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={e=>console.log('q')}
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
