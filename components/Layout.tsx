import React from 'react'
import Nav from '../components/Nav'
import RightPanel from '../components/RightPanel'

type LayoutProps = {
  children: React.ReactNode,
  mode: Function
}

export default function Layout({children, mode}: LayoutProps) {


  return (
    <>
     <div className="homeContainer" >

      <Nav mode={mode}></Nav>

      {children}
       
      <RightPanel></RightPanel>

     </div>

    </>
  )
}


