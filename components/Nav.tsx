import React from 'react'
import LoginDialog from './LoginDialog'
import Link from 'next/link'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {IconButton, Tooltip } from '@mui/material';


export default function Nav() {
const [user, loading] = useAuthState(auth)

  return (
    <div className='nav'>

      <Tooltip title="Home" placement="right">
        <IconButton style={{color: 'white'}}>
          <HomeRoundedIcon/>
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications" placement="right">
        <IconButton style={{color: 'white'}}>
          <NotificationsRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Messages" placement="right">
        <IconButton style={{color: 'white'}}>
          <EmailRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Profile" placement="right">
        <IconButton style={{color: 'white'}}>
          <PersonRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Settings" placement="right">
        <IconButton style={{color: 'white'}}>
          <SettingsRoundedIcon className='smDisappear'/>
        </IconButton>
      </Tooltip>

        {user && !loading && <LoginDialog imagesrc={user?.photoURL} />}
    </div>
  )
}
