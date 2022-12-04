import React, {useState, useRef} from 'react'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, updateDoc} from 'firebase/firestore'
import {TextField, Button} from "@mui/material"
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import Posts from '../components/Posts'


export default function index() {
  const [user, loading] = useAuthState(auth)
  const [newPost, setNewPost] = useState('') 
  const db = getFirestore()
  const colRef = collection(db, 'posts')


  function publish(){
    //check if this user has alreade published anything
    const q = query(colRef, where("uid", "==", `${user?.uid}`))

    if(!/^\s*$/.test(newPost))
    getDocs(q)
    .then((snapshot)=>{
    
      if(snapshot.docs[0]){
      let docRef = doc(db, 'posts', `${snapshot.docs[0].id}`)
      let date = Date.now()
            updateDoc(docRef, {
                [date]: [
                newPost,
                0,
                date
                ]
            }).then(()=> setNewPost(''))
          }

      else{ let date = Date.now()
        addDoc(colRef, {
          uid: user?.uid,
          [date]: [newPost, 0, date]
        }).then(()=> setNewPost(''))
      }

    })
    .catch(err=>{
      console.error(err.message)
    })

  }



  // function writeUserData(userId:string, name:string, email:string, imageUrl:number) {
  //   const db = getDatabase();
  //   alert('de')
  //   set(ref(db, 'users/' + userId), {
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }
  
  return (
    <>
     <div className='topBarMain'>cececec</div>
     <div className='topBarRight'>right</div>
 

      <div className="main" >

     {user && <div className="newPost">
        <TextField
        id='newPost'
        multiline
        value={newPost}
        onChange={e=>setNewPost(e.target.value)}
        placeholder='create a new post'
        sx={{width: '100%'}}
        />
      <br/>
      <Button
        variant='contained'
        onClick={e=>publish()}
      >publish</Button>
      </div>}



        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae qui delectus vero? Delectus, libero sunt a fugiat nesciunt facilis ab in, ducimus, voluptas deleniti ex architecto dicta ad voluptatum molestiae!
        Nisi rerum beatae mollitia ipsam perspiciatis voluptatum autem odit, deleniti sint excepturi veniam eius, dicta consectetur reiciendis quos deserunt error ut nostrum omnis nemo nobis similique et. Sit, qui ipsa.
        Rerum, atque laudantium! Cum corrupti fugit dolore nulla hic impedit, excepturi sit culpa beatae voluptates. Neque quas tempora dicta, minima perspiciatis nemo pariatur, debitis deserunt aliquam vel laudantium, consequuntur dolorum?Delectus, libero sunt a fugiat nesciunt facilis ab in, ducimus, voluptas deleniti ex architecto dicta ad voluptatum molestiae!
        Nisi rerum beatae mollitia ipsam perspiciatis voluptatum autem odit, deleniti sint excepturi veniam eius, dicta consectetur reiciendis quos deserunt error ut nostrum omnis nemo nobis similique et. Sit, qui ipsa.
        Rerum, atque laudantium! Cum corrupti fugit dolore nulla hic impedit, excepturi sit culpa beatae voluptates. Neque quas tempora dicta, minima perspiciatis nemo pariatur, debitis deserunt aliquam vel laudantium, consequuntur dolorum?Delectus, libero sunt a fugiat nesciunt facilis ab in, ducimus, voluptas deleniti ex architecto dicta ad voluptatum molestiae!
        Nisi rerum beatae mollitia ipsam perspiciatis voluptatum autem odit, deleniti sint excepturi veniam eius, dicta consectetur reiciendis quos deserunt error ut nostrum omnis nemo nobis similique et. Sit, qui ipsa.
        Rerum, atque laudantium! Cum corrupti fugit dolore nulla hic impedit, excepturi sit culpa beatae voluptates. Neque quas tempora dicta, minima perspiciatis nemo pariatur, debitis deserunt aliquam vel laudantium, consequuntur dolorum?
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, veritatis explicabo temporibus id commodi ullam totam molestias accusantium nam laborum quam dolores impedit itaque et ipsa aspernatur est quod cumque.
       Accusantium suscipit minus repellat sapiente corporis, est animi rem accusamus porro saepe perspiciatis non cumque ex, officia autem, error aspernatur eius ipsam dicta! Quam facilis ex eaque, quia modi tenetur.
       Sequi quam molestiae magni explicabo vitae? Possimus minima rem itaque, minus dolorem fuga molestias hic incidunt! Officia ipsam dignissimos qui molestias distinctio, debitis obcaecati dolorem consequuntur reprehenderit dolorum consectetur tenetur!
       Eligendi adipisci praesentium repudiandae ex repellat sit ipsum. Itaque fuga cumque ex. Debitis ratione optio libero, maxime vero inventore iusto, fugit, natus facilis sit magni molestias sunt totam unde atque?
       Libero, sunt aliquam! Incidunt temporibus necessitatibus quas unde, in, consectetur quos reiciendis laudantium mollitia rem, cumque labore repellendus rerum dolores ut! Cupiditate praesentium corrupti consectetur quia laudantium ad et nihil!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur 
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error exercitationem asperiores veniam aliquid saepe quaerat cupiditate reprehenderit nisi, rerum corrupti delectus ipsam tempore numquam magni facere! Nemo, voluptatem iusto? Accusamus.
        Deleniti voluptas sequi reprehenderit laborum. Eum nobis tempore ut vero iste labore quod quia! Natus neque autem sequi ratione placeat molestias animi, at veniam aspernatur excepturi voluptates facere voluptate quis!
        Corporis aliquam saepe assumenda illo eius nemo officia accusantium, laboriosam, voluptatem similique, ut hic possimus ipsam iure? Repudiandae eveniet accusantium nemo ipsa repellat laboriosam suscipit aliquam laborum ea. Ipsa, dolore.
        Explicabo, quo in error ad adipisci quas totam magni fuga soluta et ducimus voluptatem accusamus cumque quis optio corrupti dolores vero quae minima autem incidunt porro earum consequatur voluptates! Vitae.
        Fugit repellat dolorum, accusantium nihil amet officia? Ut nemo veniam asperiores quae ipsam molestias cum accusantium, iure deleniti quidem! Quidem esse laborum accusantium qui eveniet? Tempora a tenetur qui ducimus.
        Nisi voluptatem alias enim, unde nesciunt amet. Maxime ullam ipsum cumque, molestiae dignissimos numquam maiores, corporis nesciunt fugit deserunt natus itaque reiciendis nemo et exercitationem sed deleniti beatae accusantium facilis?
        Debitis est architecto ratione maxime natus. Et illo accusamus necessitatibus tempora maiores mollitia iste debitis officiis voluptate, hic quibusdam ab, labore explicabo velit sint reprehenderit nam autem error veritatis obcaecati!
        Earum, nulla porro magni odio corrupti nostrum tempora sapiente expedita incidunt iste nisi ut quaerat quod neque, cupiditate molestias deleniti magnam dolor! Sequi perspiciatis rem, aut quae voluptate eaque non?
        Aliquam, ipsum atque corporis quam quas perspiciatis deleniti nostrum esse voluptates facere in, nisi totam maiores odio, quo sapiente tenetur molestiae laborum possimus consequuntur! Dolorem aperiam rem explicabo perspiciatis ratione.
        Adipisci nisi illo ut dolorem, temporibus a quam, iusto ea dicta deleniti, accusantium quos ratione voluptates! Consequuntur, voluptate unde officia pariatur amet animi ad, tenetur atque eveniet, cupiditate temporibus ipsa.
      </div>


      <div className="rightPanel" style={{color: 'red'}} >
        {/* <div> */}
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat volu Lorem 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum veritatis delectus laudantium ratione incidunt suscipit obcaecati voluptatum voluptatibus quidem ea nostrum dicta sunt, adipisci id, ullam repellendus accusamus, sed beatae?
        Rem, non quae. Commodi vitae velit, hic ullam mollitia, delectus reprehenderit, dolore magnam expedita nam itaque culpa. Repudiandae temporibus vel ullam suscipit sequi aliquam, soluta dolorem inventore tenetur, nisi impedit?
        Recusandae, soluta earum obcaecati, ut repellat nemo veritatis iste dolorem voluptatibus aliquid eum quae eius, laboriosam dolorum fugiat ipsam. Hic id vel pariatur dolore libero, architecto dignissimos facilis atque nemo.
        Nemo eaque ducimus hic voluptatibus voluptatum tempora ipsum quis sit veniam! Ipsa, nesciunt quibusdam! Rerum velit reiciendis error obcaecati esse inventore, qui alias aut odio quos quaerat minus nisi corporis.
        Voluptates amet numquam nostrum nam saepe quasi reiciendis nesciunt rem cupiditate corrupti eius laboriosam harum delectus minima debitis repudiandae, quis beatae incidunt obcaecati consequatur placeat illum nulla. Eum, quae tatibus aliquid eum quae eius, laboriosam dolorum fugiat ipsam. Hic id vel pariatur dolore libero, architecto dignissimos facilis atque nemo.
        Nemo eaque ducimus hic voluptatibus voluptatum tempora ipsum quis sit veniam! Ipsa, nesciunt quibusdam! Rerum velit reiciendis error obcaecati esse inventore, qui alias aut odio quos quaerat minus nisi corporis.
        Voluptates amet numquam nostrum nam saepe quasi reiciendis nesciunt rem cupiditate corrupti eius laboriosam harum delectus minima debitis repudiandae, quis beatae incidunt obcaecati consequatur placeat illum nulla. Eum, quae 
        {/* </div> */}
      </div></>
  )
}
