import {getFirestore, collection, getDocs, addDoc, query, where, updateDoc, doc} from 'firebase/firestore'
const db = getFirestore()
const colRef = collection(db, 'users')

export default function handler(req, res){
  const q = query(colRef, where("uid", "==", 'V76dW2lLHec1OFAbxRJdxnXJtbM2'))
    // res.status(201).json(req.method)

//     if(req.method==='GET')
// {
//     res.status(201).json('gettq')

// }else{
    getDocs(q)
    .then((snapshot)=>{
      console.log('DOC', snapshot.docs[0].id)
    
      const docRef = doc(db, 'users', `${snapshot.docs[0].id}`)
            // updateDoc(docRef, {
            //   nr: '665'
            // })
            res.status(201).json(snapshot.docs[0].data())
    })
    .catch(err=>{
      console.error(err.message)
    })
    // }
}
