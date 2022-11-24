import React from 'react'
import Link from 'next/link'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'

export default function Nav() {
const [user, loading] = useAuthState(auth)
console.log(user)

  return (
    <img src={`${user?.photoURL}`} alt="" />
  )
}
