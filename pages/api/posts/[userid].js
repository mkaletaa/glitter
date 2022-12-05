import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'


const db = getFirestore()

export default function handler(req, res){
    
    const colRef = collection(db, `posts_${req.query.userid}`)


    if(req.method==='GET'){
        getDocs(colRef)
        .then((snapshot)=>{
            let posts = []
            if(snapshot.docs[0] === undefined)
                res.status(201).json('undefined')
            else{
                snapshot.docs.forEach(post=>{
                    posts.push(post.data())
                })
                    res.status(201).json(posts)
                }
            })
            .catch(err=>{
                res.status(201).json(err.message)
            })
    }
}




