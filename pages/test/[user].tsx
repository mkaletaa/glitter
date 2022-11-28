import React from 'react'
import Link from 'next/link'
import UpdateProfile from '../../components/UpdateProfile'
import { useRouter } from 'next/router'


export default function user() {
    const router = useRouter()
  return (
    <>
          <Link href={`/test/user/?modal=x`} 
      as={`/test/user/2`} >
        <button onClick={e=>console.log('dede',router.query.image)}>open modal</button>
      </Link>

      {router.query.modal && (
        <UpdateProfile user={'ede'}/>
      )}
    </>
  )
}
