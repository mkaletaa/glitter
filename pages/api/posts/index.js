import {getFirestore, collection, getDocs} from 'firebase/firestore'
const db = getFirestore()

export default function handler(req, res){
    

    const query  = collection(db, `allposts`)

    if(req.method==='GET'){
        getDocs(query)
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




