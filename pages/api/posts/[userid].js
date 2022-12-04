import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'


const db = getFirestore()
const colRef = collection(db, 'posts')

export default function handler(req, res){
  
    const q = query(colRef, where("uid", "==", `${req.query.userid}`))

    if(req.method==='GET'){
        getDocs(q)
        .then((snapshot)=>{
            if(snapshot.docs[0].data() === undefined)
                res.status(201).json('undefined')
                res.status(201).json(snapshot.docs[0].data())
            })
            .catch(err=>{
                res.status(201).json(err.message)
            })
    }
}
