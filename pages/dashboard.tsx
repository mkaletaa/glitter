import * as React from 'react'
const {useState} = React;

export default function dashboard() {
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
  }

  return (
    <>
      <div className="topBarMain">main</div>
      <div className="topBarRight">right</div>

      <div className="main">
        {
          comments.map(comment=>{
            // @ts-ignore
            return <div key={comment.id}>{comment.text}</div>
          })
        }
      </div>
      <div className="rightPanel">
        <button onClick={e=>fetchComments()}>load comments</button>
        <input type="text" value={comment} onChange={e=>setComment(e.target.value)} />
        <button onClick={e=>submitComment()}>Submit</button>
      </div>
    </>
  )
}
