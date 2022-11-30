import React, {useState} from 'react'
import LogoutDialog from './LogoutDialog'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {IconButton, Tooltip, Drawer } from '@mui/material';
import { ThemeContext } from '@emotion/react'


export default function Nav() {
const [user, loading] = useAuthState(auth)
const [isDrawerOpen, setDrawerOpen] = useState(false)
const iconColor = {color: 'white'}
const route = useRouter()

function Theme(){
  document.querySelector('body')?.classList.toggle('light')
  // document.querySelector('#main')?.classList.toggle('module.light')
}

  return (
    <>

          <Drawer
            anchor='left'
            open={isDrawerOpen}
            onClose={()=>setDrawerOpen(false)}>
            rtrtrdslorem
            Lorem ipsum dolor sit a
          </Drawer>


    <div className='nav'>

      <Tooltip title="Home" placement="right"
        onClick={e=>route.push('/')}>
        <IconButton style={iconColor}>
          <HomeRoundedIcon/>
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications" placement="right">
        <IconButton style={iconColor}>
          <NotificationsRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Messages" placement="right">
        <IconButton style={iconColor} onClick={()=>setDrawerOpen(true)} >
          <EmailRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Profile" placement="right">
        <IconButton onClick={e=>route.push(`/me`)} style={iconColor}>
          <PersonRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Settings" placement="right" className='smDisappear'>
        <IconButton style={iconColor}>
          <SettingsRoundedIcon />
        </IconButton>
      </Tooltip>

      <button onClick={e=>Theme()}>theme</button>

        {user && !loading && //TODO: don't pass avatar from firebase auth but database
        <LogoutDialog imagesrc={user?.photoURL} name={user?.displayName} />}
    </div>
    </>
  )
}
