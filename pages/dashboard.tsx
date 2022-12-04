import * as React from 'react'
import { json } from 'stream/consumers';
const {useState} = React;
const {useEffect} = React;
import {useQuery} from 'react-query'
import axios from 'axios'

export default function dashboard({users}:any) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  const fetchComments = async () => {
    const response = await fetch('/api/comments')
    const data = await response.json()
    setComments(data)
  }

  const submitComment = async ()=> {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({comment}),
      headers: {
        'Content-Type' : 'application/json'
      } 
    })

    const data = await response.json()
    fetchComments()
  }
  
  const deleteComment = async (commentId:number)=>{
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
    const data = await response.json()
    fetchComments()
  }

  const incrementCount = async ()=>{
    const registerCount = ()=> fetch('/api/increment')
    registerCount()
  }

  const {data} = useQuery('q', ()=>{
    return axios.get('http://localhost:3000/api/users/ZQ2YlBxJ03Wua1gkQCSPujTedVO2')
  })


  return (
    <>
      <div className="topBarMain">main</div>
      <div className="topBarRight">right</div>

      <div className="main">
        {
          comments.map(comment=>{
            // @ts-ignore
            return <div key={comment.id}>{comment.text} 
            {/* @ts-ignore */}
            <button onClick={e=>deleteComment(comment.id)}>delete</button>
            </div>
          })
        }
        <br></br>
        <br></br>
eee: {data?.data.displayName}
        {users.map((user:any)=>{return<><p key={user.id}>{user.name}</p></>})}
      </div>
      <div className="rightPanel">
        <button onClick={e=>fetchComments()}>load comments</button>
        <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />
        <button onClick={e=>submitComment()}>Submit</button>
        <button onClick={e=>incrementCount()}>increment</button>
      </div>
    </>
  )
}

export async function getStaticProps(){
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return {
    props: {
      users: data
    }
  }
}