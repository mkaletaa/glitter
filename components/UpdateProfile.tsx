import React, {useState, useRef, useEffect} from 'react'
import { Dialog, DialogContent, TextField, DialogTitle, Avatar, Badge, DialogActions, Button } from "@mui/material";
import { useRouter } from "next/router";
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {getFirestore, collection, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import FileUploadIcon from '@mui/icons-material/FileUpload';

import modal from '../styles/updateProfile.module.scss'

export default function UpdateProfile(props: any) {
  const [bio, setBio] = useState('')
  const [photoURL, setPhotoURL] = useState<any>('')
  const [banner, setBanner] = useState('')
  const [displayName, setDisplayName] = useState('')
  
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  const db = getFirestore()
  const colRef = collection(db, 'users')
  const q2 = query(colRef, where("uid", "==", `${user?.uid}`))

     //read current user data
        useEffect(()=>{
          getDocs(q2)
          .then((snapshot)=>{
          
            setBio(snapshot.docs[0].data().bio)
            setPhotoURL(snapshot.docs[0].data().photoURL)
            setDisplayName(snapshot.docs[0].data().displayName)
            setBanner(snapshot.docs[0].data().banner)
          
         })
         .catch(err=>{
           console.error(err.message)
         })
        }, [])

    //updating data   
    function updateProfile(){

          getDocs(q2)
          .then((snapshot)=>{

           const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
                 updateDoc(docRef, {
                   bio,
                   photoURL,
                   displayName,
                   banner
                 })
         })
         .catch(err=>{
           console.error(err.message)
         })

   }

   useEffect(()=>{
    console.log(photoURL)
   }, [photoURL])


  return (
    <Dialog
    open={true}
    onClose={() => {
      router.push(`/me`);
    }}  >

            <DialogTitle>
                <span>Edit your profile</span>
            </DialogTitle>


            <DialogContent style={{display: 'grid', gap: '10px'}}>

        <div>

                    <label htmlFor="avk-upload" 
                    style={{width: 'fit-content',marginInline: 'auto', translate: '0 -200%'}}>
                      <Badge>
                        <FileUploadIcon 
                        style={{position: 'absolute', zIndex: '2'}}></FileUploadIcon>
                      <Avatar src={photoURL} 
                      sx={{ width: 124, height: 124 }}></Avatar>
                      </Badge>
                    </label>
                        
                    <input  id='avk-upload' type="file" style={{display: 'none'}} accept=".jpg, .jpeg, .png"
                    onChange={(e:any)=>setPhotoURL(e.target.files)} />

              <img src={banner} style={{width: '100%'}} />
              
          </div>

                <TextField label={'avatar URL'}
                  value={photoURL}
                  multiline
                  onChange={e=>setPhotoURL(e.target.value)}
                  style={{marginInline: 'auto', width: '500px'}}/>

                <TextField label={'banner URL'}
                  value={banner}
                  multiline
                  onChange={e=>setBanner(e.target.value)}
                  style={{marginInline: 'auto', width: '500px'}}/>

                <TextField label={'bio'}
                  value={bio}
                  multiline
                  onChange={e=>setBio(e.target.value)}
                  style={{marginInline: 'auto', width: '500px'}}/>

                <TextField label={'name'}
                  value={displayName}
                  onChange={e=>setDisplayName(e.target.value)}
                  style={{marginInline: 'auto', width: '500px'}}/>
            </DialogContent>


            <DialogActions>
                <Button onClick={() => {router.push(`/me`) }} >Cancel</Button>
                <Button 
                onClick={e=>{updateProfile(); router.push(`/me`)}}  
                autoFocus>Submit</Button>
            </DialogActions>
  </Dialog>
  )
}
