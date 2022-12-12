import React, {useState} from 'react'
import {Avatar, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip} from '@mui/material'
import { auth } from '../utils/firebase-config'

type LogoutDialogProps = {
    imagesrc: string,
    name: string
}

export default function LogoutDialog(props:any) {
    const [open, setOpen] = useState(false)
  return (
    <>
    <Tooltip title='Log out'>
            <Avatar src={props?.imagesrc} style={{cursor: 'pointer'}} className='smDisappear'
            onClick={e=>setOpen(true)}></Avatar>
    </Tooltip>

        <Dialog open={open}
        onClose={e=>setOpen(false)}
        >
            <DialogTitle>
                <div style={{display: 'flex', gap: '15px'}}>
                    <Avatar src={props?.imagesrc}></Avatar>
                    <span>Log out</span>
                </div> 
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to log out from the account {props?.name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button onClick={e=>{setOpen(false); auth.signOut()}}>Ok</Button>
                <Button onClick={e=>setOpen(false)} autoFocus>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}
