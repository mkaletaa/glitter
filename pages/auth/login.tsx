import React from 'react'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { auth } from '../../utils/firebase-config'
import { createVerify } from 'crypto'

export default function Login() {
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = async ()=>{
        try{
            const result = await signInWithPopup(auth, googleProvider)
            console.log(result.user)
        }
        catch(err){
            console.log(err)
        }
    } 

  return (
    <div>Login

        <button onClick={GoogleLogin}>Sign with google</button>
    </div>
  )
}
