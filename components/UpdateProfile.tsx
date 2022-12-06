import * as React from 'react'
import {useState, useEffect} from 'react'
import { Dialog, DialogContent, TextField, DialogTitle, Avatar, Badge, DialogActions, Button} from "@mui/material";
import { useRouter } from "next/router";
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {getFirestore, collection, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import modal from '../styles/updateProfile.module.scss'
import axios from 'axios'
import {useQuery} from 'react-query'


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateProfile({refetch}:any) {
  const [bio, setBio] = useState('')
  const [photoURL, setPhotoURL] = useState<any>('')
  const [banner, setBanner] = useState('')
  const [displayName, setDisplayName] = useState('')
  
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  const db = getFirestore()
  const colRef = collection(db, 'users')
  const q2 = query(colRef, where("uid", "==", `${user?.uid}`))

  const {data} = useQuery('data', ()=>{ 
    return axios.get(`http://localhost:3000/api/users/${user?.uid}`)
    })

    useEffect(()=>{
      setBio(data?.data.bio)
      setPhotoURL(data?.data.photoURL)
      setDisplayName(data?.data.displayName)
      setBanner(data?.data.banner)
      console.log('s')
    }, [data])
    
     //read current user data
        // useEffect(()=>{
        //   getDocs(q2)
        //   .then((snapshot)=>{
          
        //     setBio(snapshot.docs[0].data().bio)
        //     setPhotoURL(snapshot.docs[0].data().photoURL)
        //     setDisplayName(snapshot.docs[0].data().displayName)
        //     setBanner(snapshot.docs[0].data().banner)
          
        //  })
        //  .catch(err=>{
        //    console.error(err.message)
        //  })
        // }, [])

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


   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog 
    id={modal.overlay}
    fullScreen={fullScreen}
    TransitionComponent={Transition}
    open={true}
    onClose={() => {
      router.push(`/me`); 
    }}  >


            <DialogTitle id={modal.dialogTitle} >
                <span>Edit your profile</span>
                {/* <IconButton sx={{float: 'right'}} onClick={() => {router.push(`/me`) }} >
                  <CancelIcon sx={{ color: 'red', fontSize: '30px'}}></CancelIcon>
                </IconButton> */}
            </DialogTitle>


            <DialogContent id={modal.dialogContent}>

              <br></br>

                <div id={modal.avkDiv}>

                    <label htmlFor="avk-upload" 
                    style={{width: 'fit-content'}}>

                      <Badge>
                        <FileUploadIcon 
                        style={{position: 'absolute', zIndex: '2'}}></FileUploadIcon>
                      <Avatar src={photoURL} id={modal.avatar} />
                      </Badge>
                    </label>

                    <TextField label={'avatar URL'}
                      value={photoURL}
                      multiline
                      className={modal.textField}
                      onChange={e=>setPhotoURL(e.target.value)}
                      sx={ {width: '100%'}}/>
                        
                    {/* <input  id='avk-upload' type="file" style={{display: 'none'}} accept=".jpg, .jpeg, .png"
                    onChange={(e:any)=>setPhotoURL(e.target.files)} /> */}

                </div>

                <TextField label={'name'}
                  value={displayName}
                  className={modal.textField}
                  onChange={e=>setDisplayName(e.target.value)}
                  />

              <TextField label={'bio'}
                  value={bio}
                  multiline
                  className={modal.textField}
                  onChange={e=>setBio(e.target.value)}
                  />


                <TextField label={'banner URL'}
                  value={banner}
                  multiline
                  className={modal.textField}
                  onChange={e=>setBanner(e.target.value)}
                  />
                  
                 <img src={banner} className={modal.textField} />

            </DialogContent>


            <DialogActions id={modal.dialogActions}>
                <Button sx={{color: 'red'}}
                 onClick={() => {router.push(`/me`) }} >Cancel</Button>
                <Button 
                onClick={e=>{updateProfile();  router.push(`/me`); 
                  setTimeout( refetch, 1000)
                }}  
                autoFocus>Update</Button>
            </DialogActions>
  </Dialog>
  )
}
