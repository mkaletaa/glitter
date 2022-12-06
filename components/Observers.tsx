import * as React from 'react'
import {useState, useEffect} from 'react'
import { Dialog, DialogContent, TextField, DialogTitle, Avatar, Badge, DialogActions, Button, Chip} from "@mui/material";
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

//TODO: zmienić typ 
export default function Observers({isObsNr, uid}:any) {
    const [open, setOpen] = useState(false)


  // const db = getFirestore()
  // const colRef = collection(db, 'users')
  // const q = query(colRef, where("uid", "==", `${uid}`))

  const {isLoading , data} = useQuery('data', ()=>{ 
    return axios.get(`http://localhost:3000/api/users/${uid}`)
    },{
      onSuccess
    })

    function onSuccess(){
      console.log(uid)
    }
   
    
//   const {data} = useQuery('data', ()=>{ 
//     return axios.get(`http://localhost:3000/api/users/${user?.uid}`)
//     })




   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (<>
  <Chip
    label={`followers: ${isObsNr}`}
  // onClick={(e:any)=>setOpen(true)}
  ></Chip>

  
    <Dialog
    id={modal.overlay}
    fullScreen={fullScreen}
    TransitionComponent={Transition}
    open={open}
    onClose={() => {
      setOpen(false)
    }}  >


            <DialogTitle id={modal.dialogTitle} >
                <span>Edit your profile</span>
            </DialogTitle>


            <DialogContent id={modal.dialogContent}>
              <br></br>
ss sdccccccccccccccccccccccccccccccccc
{/* {data?.data.id} */}
                   {/* {data ? data?.data.isObservedBy.map((el:any)=>{
                    return (
                      <div key={Date.now()}>{el.id}</div>
                    )
                   }) : null} */}

            </DialogContent>


            <DialogActions id={modal.dialogActions}>
                <Button 
                onClick={e=>{setOpen(false)}}  
                autoFocus>Close</Button>
            </DialogActions>
  </Dialog>
 </> )
}
