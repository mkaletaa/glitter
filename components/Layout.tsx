import React from 'react'
import Nav from '../components/Nav'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
  


  return (
    <>
     <div className="homeContainer" onScroll={e=>alert('dd')}>

      <Nav></Nav>

      {children}
       

     </div>

    </>
  )
}


