import React from 'react'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'


export default function Userprofile() {
  const router = useRouter()
  const { userprofile : userUid } = router.query

  // getAuth()
  // .getUser(userUid)
  // .then((userRecord:any) => {
  //   // See the UserRecord reference doc for the contents of userRecord.
  //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  // })
  // .catch((error:any) => {
  //   console.log('Error fetching user data:', error);
  // });
  
  return (
    <div>{userUid}</div>
  )
}
