import React from 'react'
import Nav from '../components/Nav'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
  
// console.log(user)
  // if (typeof window != "undefined") { 
  //   console.log(window.scrollY)
  //   }

  //   const rightPanel = useRef<HTMLDivElement>(null)
    
  //   const handleScroll = (scroll:any) => {
  //     console.log('eeded')
  //     window?.scrollBy(0, document.querySelector('.rightPanel')?.scrollTop)
  //   };

  //   useEffect(()=>{
  //     window?.addEventListener('scroll', e=>console.log('body'))
  //   }, [])

  return (
    <>
     <div className="homeContainer" onScroll={e=>alert('dd')}>

      <Nav></Nav>

      {children}
       

     </div>

    </>
  )
}


