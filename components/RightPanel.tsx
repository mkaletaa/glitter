import React, {useEffect} from 'react'
import { useRouter } from 'next/router';
import right from '../styles/rightPanel.module.scss'
import {List, ListItemButton, Avatar, ListSubheader, Divider} from '@mui/material'
import Link from 'next/link'

export default function RightPanel() {
  const router = useRouter()


  return (
    <div className='rightPanel'  >

            <List className={right.cards}>
     
              <ListSubheader className={right.header}>Recommended for you:</ListSubheader>

              <Divider></Divider>

              <Link href={'/profile/zdzislawpaleta'}>
              <ListItemButton>
                <Avatar sx={{width: '80px', height: '80px'}}
                  src={'https://www.swiatobrazu.pl/picture/i/y9k/w3p/4sl/1c368_s_660_0_0_0_0_0_0_y9kw3p4slxfhmeyqeu9p65oooik7kwn7yvxqcq8mbdxpii6n35100feemocycox0.jpeg'}/>
                  <div className={right.recInfo}>
                    <b>Zdzisław Paleta</b>
                    <span>Witam serdecznie na moim profilu</span>
                  </div>
              </ListItemButton></Link>

                <Divider></Divider>

              <Link href={'/profile/ZQ2YlBxJ03Wua1gkQCSPujTedVO2'}>
              <ListItemButton>
                <Avatar sx={{width: '80px', height: '80px'}}
                  src={'https://www.befunky.com/images/wp/wp-2020-07-glitter-final-1-scaled.jpg?auto=avif,webp&format=jpg&width=944'}/>
                  <div className={right.recInfo}>
                    <b>Jolanta Swędzipięta</b>
                    <span>kawa czy herbata?</span>
                  </div>
              </ListItemButton></Link>
 
                <Divider></Divider>

              <Link href={'/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2'}>
              <ListItemButton>
                <Avatar sx={{width: '80px', height: '80px'}}
                  src={'https://avatars.githubusercontent.com/u/20715958?v=4'}/>
                  <div className={right.recInfo}>
                    <b>Mikołaj Kaleta</b>
                    <span>Twóca Glittera. Pozdrawiam wszystkich.</span>
                  </div>
              </ListItemButton></Link>
             
            </List>

            
          <p id={right.p}>Glitter® 2022</p>

    </div>
  )
}
