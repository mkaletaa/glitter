import React from 'react'
import { useRouter } from 'next/router'

export default function Userprofile() {
  const router = useRouter()
  const { userprofile : userName } = router.query
  return (
    <div>{userName}</div>
  )
}
