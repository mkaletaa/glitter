import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'
const db = getFirestore()
const colRef = collection(db, 'users')


export default function handler(req, res){
    if(req.method==='GET')
    {

      getDocs(colRef)
      .then((snapshot)=>{
              let users = []
              snapshot.forEach(doc=>{
                users.push(doc.data())
              })
              res.status(201).json(users)
          })
          .catch(err=>{
              res.status(201).json(err.message)
          })
    }

}
