import React, {useState} from 'react'
import RateReviewIcon from '@mui/icons-material/RateReview';
import {IconButton, Tooltip} from '@mui/material';
import { useRouter } from 'next/router'
import { Dialog, DialogContent, TextField, DialogTitle, Avatar, Badge, DialogActions, Button, CircularProgress, Snackbar, Alert} from "@mui/material";
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import modal from '../styles/updateProfile.module.scss'
import useAddPost from '../utils/custom-hooks/useAddPost';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function NewPost() {
const router = useRouter()
const [showNewPost, setShowNewPost] = useState(false)
const [showAlert, setShowAlert] = useState(false)
const [user, loading] = useAuthState(auth)

const {publish, user: user1, newPost, publishProgress,  setNewPost} = useAddPost()


 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
    <Tooltip title="New post" placement="right">
        <IconButton onClick={e=>{user ? setShowNewPost(true) : setShowAlert(true)}} >
          <RateReviewIcon/>
        </IconButton>
    </Tooltip>

     <Dialog 
    //    id={modal.overlay}
    //    fullScreen={fullScreen}
       TransitionComponent={Transition}
       open={showNewPost}
       onClose={() => {
           setShowNewPost(false)
       }}  >

            <DialogTitle id={modal.dialogTitle} >
                <span>Create a new post</span>
            </DialogTitle>

            <DialogContent id={modal.newPost} >

            <TextField
               id='newPost'
               multiline
               value={newPost}
               onChange={e=>setNewPost(e.target.value)}
               placeholder='create a new post'
               sx={{width: '100%'}}
               />

            </DialogContent>

            <DialogActions id={modal.dialogActions}>
                <Button sx={{color: 'red'}}
                 onClick={() => { setShowNewPost(false) }} >Cancel</Button>

                <Button
                 variant='contained'
                 onClick={e=>publish()}>
                {publishProgress ? <CircularProgress color="secondary" /> : 'publish'}
                </Button>
            </DialogActions>
        </Dialog>
  

        <Snackbar open={!user && showAlert} autoHideDuration={3000} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={e=>{setShowAlert(false)}}  severity="error" 
            sx={{ width: '100%'}}  variant="filled">
             <div id={modal.span}>
                You must be logged in to create posts!
             </div>
            </Alert>
          </Snackbar>
    </>
  )
}
