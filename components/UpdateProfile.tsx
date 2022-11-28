import React, {useState} from 'react'
import { Dialog, DialogContent } from "@mui/material";
import { useRouter } from "next/router";

export default function UpdateProfile(props: any) {
  const router = useRouter()
const [modal, setModal] = useState(true)

  return (
    <Dialog

    open={true}
    onClose={() => {
      router.push(`/me`);
    }}
    className="fixed inset-0 z-10 flex items-center justify-center"
  >

    <div className="relative flex items-center justify-center w-1/2">
      to jest modal

    </div>
  </Dialog>
  )
}
