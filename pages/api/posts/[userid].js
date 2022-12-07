import {getFirestore, collection, getDoc, query, orderBy, limit, where, doc} from 'firebase/firestore'


const db = getFirestore()

export default function handler(req, res){
    
    // const colRef = collection(db, `posts_${req.query.userid}`)
    //można jeszcze ustawić limit
    const docRef = doc(db, 'posts', `${req.query.userid}`, limit(1))
    // const q = query(colRef, where("uid", "==", `ZQ2YlBxJ03Wua1gkQCSPujTedVO2`))
    // const query  = collection(db, `posts/${req.query.userid}`)


    if(req.method==='GET'){
        getDoc(docRef)
        .then((doc)=>{
            let posts = []
            res.status(201).json(doc.data())
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




