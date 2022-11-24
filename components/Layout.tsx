import React from 'react'
import Nav from './Nav'

export default function Layout({children}:any) {
  return (
    <div>
        <Nav></Nav>
        {children}
    </div>
  )
}
