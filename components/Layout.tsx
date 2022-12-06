import React from 'react'
import Nav from '../components/Nav'
import RightPanel from '../components/RightPanel'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {



  return (
    <>
     <div className="homeContainer" >

      <Nav></Nav>

      {children}
       
      <RightPanel></RightPanel>

     </div>

    </>
  )
}


