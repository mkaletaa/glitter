import * as React from 'react'
import { json } from 'stream/consumers';
const {useState} = React;
const {useEffect} = React;
import {useQuery} from 'react-query'
import axios from 'axios'
import {getFirestore, collection, setDoc, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import { useInfiniteQuery } from 'react-query';

export default function Dashboard({users}:any) {
// const [par, setPar] = useState(0)
//   const fetchPosts=({pageParam=0})=>{
//     // alert(pageParam)
//     setPar(prev=>prev+1)
//     console.log('pageparam', pageParam)
//     return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/test?page=1&size=3`)
//   }

//   const {data, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery(
//     ['colors'],
//       fetchPosts,{
//     //   refetchInterval: 1000,
//       getNextPageParam: (_lastPage, pages)=>{
//        return pages.length+1
//       },
//       onSuccess: ()=>{console.log('data', data?.pages[0].data)},
//       onError: ()=>{console.log('error')}
//     }
//   )

// useEffect(()=>{
// //   alert(data?.pages)
// console.log(par)
// }, [par])
  return (
    <>
      <div className="topBarMain">main</div>
      <div className="topBarRight">right</div>

      <div className="main">
        {/* <button  onClick={fetchNextPage}>setDoc</button>
          {
            data?.pages[0].data.map((a:any)=>{return (<div key={a.id}>{a.text}</div>)})
          } */}
      </div>

    </>
  )
}

