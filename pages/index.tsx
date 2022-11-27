import React from 'react'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore'



export default function index() {
  const db = getFirestore()
  const colRef = collection(db, 'books')

  getDocs(colRef)
    .then((snapshot)=>{
      let books:any = []
      snapshot.docs.forEach(doc=>{
        books.push({...doc.data(), id: doc.id})
      })
    })
    .catch(err=>{
      console.error(err.message)
    })

    function add(){

      addDoc(colRef, {
        title: 'book2',
        id: 'qwsqws'
      })
      .then(()=>{

      })

    }

    function deletebook(){
      const docRef = doc(db, 'books', 'EYIeaeLln0voX2X8a42S')

      deleteDoc(docRef)
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
     <div className='topBar'>cececec</div>
     {/* <div className='topBar1'>cececec</div> */}
        {/* <div className='topBar'>cecfddfecec</div> */}

      <div className="main" >

        <button onClick={()=>add()}>click</button>
        <button onClick={()=>deletebook()}>click</button>


        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae qui delectus vero? Delectus, libero sunt a fugiat nesciunt facilis ab in, ducimus, voluptas deleniti ex architecto dicta ad voluptatum molestiae!
        Nisi rerum beatae mollitia ipsam perspiciatis voluptatum autem odit, deleniti sint excepturi veniam eius, dicta consectetur reiciendis quos deserunt error ut nostrum omnis nemo nobis similique et. Sit, qui ipsa.
        Rerum, atque laudantium! Cum corrupti fugit dolore nulla hic impedit, excepturi sit culpa beatae voluptates. Neque quas tempora dicta, minima perspiciatis nemo pariatur, debitis deserunt aliquam vel laudantium, consequuntur dolorum?Delectus, libero sunt a fugiat nesciunt facilis ab in, ducimus, voluptas deleniti ex architecto dicta ad voluptatum molestiae!
        Nisi rerum beatae mollitia ipsam perspiciatis voluptatum autem odit, deleniti sint excepturi veniam eius, dicta consectetur reiciendis quos deserunt error ut nostrum omnis nemo nobis similique et. Sit, qui ipsa.
        Rerum, atque laudantium! Cum corrupti fugit dolore nulla hic impedit, excepturi sit culpa beatae voluptates. Neque quas tempora dicta, minima perspiciatis nemo pariatur, debitis deserunt aliquam vel laudantium, consequuntur dolorum?Delectus, libero sunt a fugiat nesciunt facilis ab in, ducimus, voluptas deleniti ex architecto dicta ad voluptatum molestiae!
        Nisi rerum beatae mollitia ipsam perspiciatis voluptatum autem odit, deleniti sint excepturi veniam eius, dicta consectetur reiciendis quos deserunt error ut nostrum omnis nemo nobis similique et. Sit, qui ipsa.
        Rerum, atque laudantium! Cum corrupti fugit dolore nulla hic impedit, excepturi sit culpa beatae voluptates. Neque quas tempora dicta, minima perspiciatis nemo pariatur, debitis deserunt aliquam vel laudantium, consequuntur dolorum?
       
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur 
      </div>


      <div className="rightPanel" >
        <div>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat volu Lorem 
        lorem*20
        </div>
      </div></>
  )
}
