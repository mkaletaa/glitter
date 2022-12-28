import React from 'react'
import Nav from '../components/Nav'
import RightPanel from '../components/RightPanel'
import MessagesPanel from '../components/MessagesPanel'
import { useRouter } from 'next/router';


type LayoutProps = {
  children: React.ReactNode,
  mode: Function
}

export default function Layout({children, mode}: LayoutProps) {
  const router = useRouter()
  // console.warn(router)
  return (
    <>
     <div className="homeContainer" >

      <Nav mode={mode}></Nav>

      {children}
   
      <div className='rightPanel'>   
       {(router.pathname===`/messages` || router.pathname===`/messages/[userid]`)   ? 
        <MessagesPanel/> :        
        <RightPanel/>
       }
      </div>

     </div>

    </>
  )
}


