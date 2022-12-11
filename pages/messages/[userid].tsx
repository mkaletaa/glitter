import React, {useRef, useEffect, useState} from 'react'
import { auth } from '../../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {TextField, Button} from "@mui/material"
import scss from '../../styles/messages.module.scss'
import {getFirestore, collection, getDocs, query, orderBy, limit, where, doc, onSnapshot, setDoc} from 'firebase/firestore'
import { useRouter } from 'next/router';
import SendIcon from '@mui/icons-material/Send';


export default function Userid() {
  const [user, loading] = useAuthState(auth)
  const messagesEndRef1 = useRef(null)
  const messagesEndRef2 = useRef(null)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const interlocutor = router.query
  
  const [messages, setMessages] = useState([])
  const db = getFirestore()
  
  useEffect(()=>{
    if(user){
      const sorted =  [user?.uid, interlocutor.userid].sort((a, b) => a?.localeCompare(b))
      console.error(sorted)

      const query  = collection(db, `messages/${sorted[0]}-${sorted[1]}/conversation`)

      // getDocs(query)
      onSnapshot(query, (snapshot)=>{
          let messages:any = []
          // res.status(201).json(query)
          if(snapshot.docs[0] === undefined)
              console.log('undefined')
          else{
              snapshot.docs.forEach(message=>{
                  messages.unshift(message.data())
              })
                  console.log(messages)
                  setMessages(messages)
              }
          })

    }
  }, [user])

  const scrollToBottom = () => {
    messagesEndRef1.current?.scrollIntoView()
    messagesEndRef2.current?.scrollIntoView()
  }

  useEffect(() => {
    setTimeout(()=>{

      scrollToBottom()
    }, 10)
  }, []);
  useEffect(() => {
    // setTimeout(()=>{

      scrollToBottom()
    // }, 500)
  }, [message]);


  function send(){
    if(!/^\s*$/.test(message)){

      const sorted =  [user?.uid, interlocutor.userid].sort((a, b) => a?.localeCompare(b))

    let id = 9999999999999 - Date.now()
    const date = JSON.stringify(new Date().getDate()) + '-' +
                JSON.stringify(new Date().getMonth()+1) + '-' +
                JSON.stringify(new Date().getFullYear())
    setDoc(doc(db, `messages/${sorted[0]}-${sorted[1]}/conversation/${id}`), 
    {  
      uid: user?.uid,
      text: message,
      likes: 0,
      date,
      id,
      author: user?.uid
    }).then(()=> {setMessage('')})
  
    }
  }


  return (
    <>
        <div className='topBarMain'>Messages</div>
        <div className='topBarRight'></div>

        <div className='main messagesMain'>

          <div id={scss.messages}>
            {messages.map((a:any)=>{return (
              <> 
              
              <div 
                className={user?.uid === a.author ? scss.message1 : scss.message2} 
                >{a.text}
              </div>
      
  
              </>
            )})}
 
          
        <div ref={messagesEndRef1} />

          </div>

          <div id={scss.sendDiv}>
          <TextField
             id={scss.newMessage}
             multiline
             value={message}
             onChange={e=>setMessage(e.target.value)}
             placeholder='create a new message'
            />

            <Button sx={{height: '55px'}}
              variant='contained'
              onClick={e=>send()}
            >
              <SendIcon/>
        </Button>
        </div>


        <div ref={messagesEndRef2} />
        </div>
    </>
  )
}
