import {getFirestore, collection, getDocs, query, orderBy, limit, where, doc} from 'firebase/firestore'


const db = getFirestore()

export default function handler(req, res){
    
    // const colRef = collection(db, `posts_${req.query.userid}`)
    //można jeszcze ustawić limit
    // const docRef = doc(db, 'posts', `${req.query.userid}`, limit(1))
    // const q = query(colRef, where("uid", "==", `ZQ2YlBxJ03Wua1gkQCSPujTedVO2`))
    // const query  = collection(db, `posts/${req.query.userid}`)

    const query  = collection(db, `posts/${req.query.userid}/posts`)

    const pageLength = 5

    if(req.method==='GET'){
        getDocs(query)
        .then((snapshot)=>{
            let posts = []
            // res.status(201).json(query)
            if(snapshot.docs[0] === undefined)
                res.status(201).json('undefined')
            else{ let index=0
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