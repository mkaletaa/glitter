import * as React from 'react'
import { json } from 'stream/consumers';
const {useState} = React;

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
    console.log(data)
    fetchComments()
  }
  
  const deleteComment = async (commentId:number)=>{
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })
    const data = await response.json()
    console.log('trdytd',data)
    fetchComments()
  }


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

        {users.map((user:any)=>{return<><p key={user.id}>{user.name}</p></>})}
      </div>
      <div className="rightPanel">
        <button onClick={e=>fetchComments()}>load comments</button>
        <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />
        <button onClick={e=>submitComment()}>Submit</button>
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