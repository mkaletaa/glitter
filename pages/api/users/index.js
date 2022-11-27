import {users} from '../../../data/users'

export default function handler(req, res){
    if(req.method==='GET')
    res.status(200).json(users)
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
