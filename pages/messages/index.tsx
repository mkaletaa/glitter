import React, {useEffect, useState} from 'react'
import MessagesPanel from '../../components/MessagesPanel'
import Image from 'next/image';
import scss from '../../styles/messages.module.scss'

export default function Index() {

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
            <div className='topBarMain'>Messages</div>
            <div className='topBarRight'></div>

            <div className="main messagesMain">
                {sm ? 
                <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
                <MessagesPanel/> 
                </div>
                : 
                <>
                <div id={scss.div}>
                    Choose the person you want to contact from the list on the right.
                </div>
                <Image src={require('../../public/mailbox.svg').default} alt='mailbox' className={scss.mailbox}></Image>
                </>
                }
            </div>
        </>
  )
}

