import {users} from '../../../data/users'
import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'
const db = getFirestore()
const colRef = collection(db, 'users')
const q = query(colRef, where("uid", "==", `ZQ2YlBxJ03Wua1gkQCSPujTedVO2`))


export default function handler(req, res){
    if(req.method==='GET')
    {

      getDocs(q)
      .then((snapshot)=>{
              res.status(201).json(snapshot.docs[0].data())
          })
          .catch(err=>{
              res.status(201).json(err.message)
          })


    }







    else if(req.method==='POST'){
      const user = req.body.user
      console.warn(req.body)
    const newUser = { 
        uid: JSON.parse(req.body)[0],
        displayName: JSON.parse(req.body)[1],
        photoURL: JSON.parse(req.body)[2],
        bio: JSON.parse(req.body)[3],
    }
    users.push(newUser)
    res.status(201).json(newUser)
  }
}
