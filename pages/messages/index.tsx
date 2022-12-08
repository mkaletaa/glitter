import React, {useEffect, useState} from 'react'
import MessagesPanel from '../../components/MessagesPanel'



export default function index() {

    const [sm, setSm] = useState<boolean>()
    useEffect(() => {
  
        window.addEventListener('resize', ()=>{
     
            if(window?.innerWidth <=1000)
            setSm(true)
            else setSm(false)
        });
    
        if(window?.innerWidth <=1000)
            setSm(true)
            else setSm(false)

      }, []);

  return (
        <>
            <div className='topBarMain'></div>
            <div className='topBarRight'></div>

            <div className="main">
                {sm ? <MessagesPanel/> : 
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium impedit deserunt sunt assumenda molestiae mollitia? Optio inventore magni cupiditate, vitae sequi necessitatibus nesciunt, neque corrupti iure, eveniet porro cum     Consectetur itaque exercitationem quis sed quam adipisci! Labore quod, sed ullam consequatur commodi ex vero doloribus voluptatum laborum totam cumque at. Omnis quibusdam fugit accusantium consequuntur cupiditate exercitationem, aliquid quos!'}
            </div>
        </>
  )
}

