import * as React from 'react'
import { json } from 'stream/consumers';
const {useState} = React;
const {useEffect} = React;
import {useQuery} from 'react-query'
import axios from 'axios'
import {getFirestore, collection, setDoc, getDocs, query, where, updateDoc, doc} from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'

export default function dashboard({users}:any) {

  const db = getFirestore()
  const query  = collection(db, 'test/h3aNJe6Ismsac6L9crOr/doc')

  const [docs, loading, error] = useCollectionData(query)
  console.log(docs)
      getDocs(query)
        .then((snapshot)=>{
            let posts:any = []
            
                snapshot.docs.forEach(post=>{
                    posts.push(post.data())
                })
                    console.log(snapshot.docs[0].data())
                
            })
      function setD(){
        setDoc(doc(db, "posts/useruid/useruidposts/idposta"), {
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        });
      }


  return (
    <>
      <div className="topBarMain">main</div>
      <div className="topBarRight">right</div>

      <div className="main">
   <button onClick={e=>setD()}>setDoc</button>
      </div>

    </>
  )
}

export async function getStaticProps(){
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return {
    props: {
      users: data
    }
  }
}