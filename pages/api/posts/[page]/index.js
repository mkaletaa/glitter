import {getFirestore, collection, getDocs} from 'firebase/firestore'
const db = getFirestore()

export default function handler(req, res){

    const query  = collection(db, `allposts`)
    const pageLength = 5

    if(req.method==='GET'){
        getDocs(query)
        .then((snapshot)=>{
            let posts = []
            if(snapshot.docs[0] === undefined)
                res.status(201).json('undefined')
            else{
                let index = 0
                snapshot.docs.forEach(post=>{
                    if(index>=req.query.page*pageLength && index<req.query.page*pageLength+pageLength)
                    posts.push(post.data())
                index++
                })
                    res.status(201).json(posts)
                }
            })
            .catch(err=>{
                res.status(201).json(err.message)
            })
    }
}




