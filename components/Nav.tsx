import React, {useState, useEffect} from 'react'
import LogoutDialog from './LogoutDialog'
import Notifications from './Notifications'
import NewPost from './NewPost'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {IconButton, Tooltip} from '@mui/material';
import { ThemeContext } from '@emotion/react'
import {useQuery} from 'react-query'
import axios from 'axios'


import Switch, { SwitchProps } from '@mui/material/Switch';

export default function Nav({mode}:any) {
const [user, loading] = useAuthState(auth)
const iconColor = {color: 'white'}
const router = useRouter()

useEffect(()=>{
  document.querySelector('body')?.classList.add('dark')
}, [])

function Theme(){
  document.querySelector('body')?.classList.toggle('dark')
  document.querySelector('body')?.classList.toggle('light')
    mode()
  // setSwitchMode(switchMode==='dark' ? 'light' : 'dark')
}


// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   '& .MuiSwitch-switchBase': {
//     margin: 1,
//     padding: 0,
//     transform: 'translateX(6px)',
//     '&.Mui-checked': {
//       color: '#fff',
//       transform: 'translateX(22px)',
//       '& .MuiSwitch-thumb:before': {
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           '#fff',
//         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//       },
//       '& + .MuiSwitch-track': {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//       },
//     },
//   },
//   '& .MuiSwitch-thumb': {
//     backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
//     width: 32,
//     height: 32,
//     '&:before': {
//       content: "''",
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       left: 0,
//       top: 0,
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'center',
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//         '#fff',
//       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//     },
//   },
//   '& .MuiSwitch-track': {
//     opacity: 1,
//     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//     borderRadius: 20 / 2,
//   },
// }));




const [pollingTime, setPollingTime] = useState(100)
function onSuccess(){
  if(data?.data!=="Cannot read properties of undefined (reading 'data')" 
    && data?.data!==undefined)
    setPollingTime(0)
}

  const {data} = useQuery('data', ()=>{ 
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/${user?.uid}`)
    },{
      refetchInterval: pollingTime,
      onSuccess
    })

  return (
    <>

    <div className='nav'>

      <Tooltip title="Home" placement="right"
        onClick={e=>router.push('/')}>
        <IconButton style={iconColor}>
          <HomeRoundedIcon/>
        </IconButton>
      </Tooltip>

              <Notifications iconColor={iconColor}/>


      <Tooltip onClick={e=>router.push('/messages')} title="Messages" placement="right">
        <IconButton style={iconColor}  >
          <EmailRoundedIcon/>
        </IconButton>
      </Tooltip>


      <Tooltip title="Profile" placement="right">
        <IconButton onClick={e=>router.push(`/me`)} style={iconColor}>
          <PersonRoundedIcon/>
        </IconButton>
      </Tooltip>

     <NewPost></NewPost>

    <Tooltip title="Toggle theme" placement="right" className='smDisappear'>
      <Switch onClick={e=>Theme()}></Switch>
    </Tooltip>
      
     {/* <MaterialUISwitch sx={{ m: 1 }} onChange={e=>Theme()} defaultChecked /> */}
  
        {user && !loading && 
        <LogoutDialog imagesrc={data?.data.photoURL} name={data?.data.displayName} />}
    </div>
    </>
  )
}
