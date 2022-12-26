import React, {useState} from 'react'
import useAddPost from '../utils/custom-hooks/useAddPost'
import {TextField, Button} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import Posts from '../components/Posts'

export default function Index() {
  const [publishBtn, setPublishBtn] = useState(false)
  const {publish, user, newPost, publishProgress,  setNewPost} = useAddPost()


  return (
    <>
     <div className='topBarMain'>
       <span>Home</span>
     </div>
     <div className='topBarRight'></div>
 
      <div className="main" >

     {user && 
     <div className="newPost">

        <TextField
        id='newPost'
        multiline
        value={newPost}
        onChange={e=>setNewPost(e.target.value)}
        placeholder='create a new post'
        onFocus={e=>setPublishBtn(true)}
        onBlur={e=>setPublishBtn(/^\s*$/.test(newPost) ? false : true)}
        sx={{width: '100%'}}
        />

      {publishBtn && <Button
        variant='contained'
        onClick={e=>publish()}>
        {publishProgress ? <CircularProgress color="secondary" /> : 'publish'}
      </Button>}

      </div>}
        
      <Posts uid={null}></Posts>

      </div>
      </>
  )
}
