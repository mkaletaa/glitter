import * as React from 'react'
import { json } from 'stream/consumers';
const {useState} = React;
const {useEffect} = React;
import {useQuery} from 'react-query'
import axios from 'axios'
import {getFirestore, collection, setDoc, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import { useInfiniteQuery } from 'react-query';

export default function Dashboard({users}:any) {


// useEffect(()=>{
// //   alert(data?.pages)
// console.log(par)
// }, [par])
  return (
<></>
  )
}

