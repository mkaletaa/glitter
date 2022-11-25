import React, {useState} from 'react'
import {Avatar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip} from'@mui/material'
import { auth } from '../utils/firebase-config'

export default function LoginDialog(prop:any) {
    console.log(prop.imagesrc)
    const [open, setOpen] = useState(false)
  return (
    <>
    <Tooltip title='Log out'>
        <Avatar src={prop?.imagesrc} style={{cursor: 'pointer'}} 
        onClick={e=>setOpen(true)}></Avatar>
    </Tooltip>

        <Dialog open={open}
        onClose={e=>setOpen(false)}
        >
            <DialogTitle>Log out</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
        {/* <Button onClick={()=>auth.signOut()}>sign out</Button> */}

                <Button onClick={e=>{setOpen(false); auth.signOut()}}>Ok</Button>
                <Button onClick={e=>setOpen(false)} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}
