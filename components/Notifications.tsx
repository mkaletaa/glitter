import React, {useState} from 'react'
import {Tooltip, IconButton, Drawer, Divider, List, ListItemButton, Badge} from '@mui/material'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import notifications from '../styles/notifications.module.scss'

type typeProps={
    color: 'string'
}

export default function Notifications({iconColor}:any) {
    const [isDrawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
    <Tooltip title="Notifications" placement="right">
      <Badge> 
        <span id={notifications.span}/>
        <IconButton style={iconColor} onClick={()=>setDrawerOpen(true)}>
          <NotificationsRoundedIcon/>
        </IconButton>
      </Badge>
    </Tooltip>

      <Drawer 
           PaperProps={{
            sx: { width: "280px" },
              }}
            anchor='left'
            open={isDrawerOpen}
            onClose={()=>setDrawerOpen(false)}>
           
           <div id={notifications.header} >
              <strong>Notifications</strong>

            <IconButton style={{width: 'fit-content'}}  
              onClick={()=>setDrawerOpen(false)}>
              <DisabledByDefaultIcon color='error'/>
           </IconButton>

           </div>
           <Divider/>

           <div id={notifications.notifications}>

        
        <List>
          <ListItemButton>
            dede
          </ListItemButton>
        </List>
                
           </div>

          </Drawer>
    </>
  )
}
