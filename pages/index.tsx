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
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, veritatis explicabo temporibus id commodi ullam totam molestias accusantium nam laborum quam dolores impedit itaque et ipsa aspernatur est quod cumque.
       Accusantium suscipit minus repellat sapiente corporis, est animi rem accusamus porro saepe perspiciatis non cumque ex, officia autem, error aspernatur eius ipsam dicta! Quam facilis ex eaque, quia modi tenetur.
       Sequi quam molestiae magni explicabo vitae? Possimus minima rem itaque, minus dolorem fuga molestias hic incidunt! Officia ipsam dignissimos qui molestias distinctio, debitis obcaecati dolorem consequuntur reprehenderit dolorum consectetur tenetur!
       Eligendi adipisci praesentium repudiandae ex repellat sit ipsum. Itaque fuga cumque ex. Debitis ratione optio libero, maxime vero inventore iusto, fugit, natus facilis sit magni molestias sunt totam unde atque?
       Libero, sunt aliquam! Incidunt temporibus necessitatibus quas unde, in, consectetur quos reiciendis laudantium mollitia rem, cumque labore repellendus rerum dolores ut! Cupiditate praesentium corrupti consectetur quia laudantium ad et nihil!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur 
      </div>


      <div className="rightPanel" >
        <div>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat volu Lorem 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum veritatis delectus laudantium ratione incidunt suscipit obcaecati voluptatum voluptatibus quidem ea nostrum dicta sunt, adipisci id, ullam repellendus accusamus, sed beatae?
        Rem, non quae. Commodi vitae velit, hic ullam mollitia, delectus reprehenderit, dolore magnam expedita nam itaque culpa. Repudiandae temporibus vel ullam suscipit sequi aliquam, soluta dolorem inventore tenetur, nisi impedit?
        Recusandae, soluta earum obcaecati, ut repellat nemo veritatis iste dolorem voluptatibus aliquid eum quae eius, laboriosam dolorum fugiat ipsam. Hic id vel pariatur dolore libero, architecto dignissimos facilis atque nemo.
        Nemo eaque ducimus hic voluptatibus voluptatum tempora ipsum quis sit veniam! Ipsa, nesciunt quibusdam! Rerum velit reiciendis error obcaecati esse inventore, qui alias aut odio quos quaerat minus nisi corporis.
        Voluptates amet numquam nostrum nam saepe quasi reiciendis nesciunt rem cupiditate corrupti eius laboriosam harum delectus minima debitis repudiandae, quis beatae incidunt obcaecati consequatur placeat illum nulla. Eum, quae deserunt.
        Voluptatibus repudiandae, quae suscipit sequi minus quo distinctio officia. Praesentium similique tenetur reiciendis iure eum maxime sapiente, consectetur voluptatum itaque ab nobis unde, eligendi eaque neque explicabo modi quis. Iure?
        Nisi illum, unde ut ab ipsum soluta quisquam veritatis beatae officiis illo et odit a iusto fugit nihil aspernatur voluptates rerum facere eum. Perferendis veritatis accusamus, alias adipisci sunt delectus.
        Iure eaque dolore cumque, tenetur natus omnis recusandae aliquid molestias modi, libero quae nemo totam, cupiditate aspernatur iste doloribus at? Dignissimos nulla iure consequatur, dolorem commodi totam nostrum nemo explicabo?
        Delectus fugiat repudiandae nam fuga? Est ratione porro nesciunt consectetur, voluptatem doloremque quod deleniti qui dolorum praesentium, illo, eos ea veniam molestias? Temporibus, nisi sed sunt facilis cum tempora deleniti.
        Sequi officia, vitae eveniet voluptates inventore veritatis architecto exercitationem minima obcaecati nemo qui, quae commodi temporibus ipsum. Dolorem dolore minima accusantium delectus ut repudiandae ipsam libero, exercitationem reprehenderit ab veritatis?
        Commodi, cupiditate nisi ducimus provident dicta necessitatibus dolores, dolorem nam autem esse, error nihil voluptatibus ipsa quisquam quasi doloremque. Qui repellendus tempora cum nihil rem cupiditate possimus minima iure magni.
        Animi maiores similique expedita veniam maxime ipsum ex delectus aliquid quisquam minus. Dolorem, voluptatem fugiat. Dolor consequuntur quasi unde velit, laborum voluptas error sint qui mollitia maxime. Blanditiis, eius inventore.
        Quibusdam labore blanditiis minima accusamus dolorem aperiam dicta obcaecati, dolorum quisquam necessitatibus voluptatibus? Dolores voluptates doloribus veniam neque nesciunt corporis nulla voluptate quibusdam delectus enim, nisi reiciendis blanditiis nostrum esse?
        Eos saepe nihil animi obcaecati voluptates! Quasi, fugit debitis cupiditate quaerat, tempore nemo, reiciendis suscipit quo libero sed minus totam corrupti possimus ullam voluptates pariatur enim amet accusamus maiores sequi.
        Vitae excepturi officia eos omnis nulla, sed voluptate fugiat nam molestias, sunt atque facilis quasi dolorem officiis. Ipsam fugit earum aspernatur. Distinctio vitae debitis praesentium animi harum molestiae voluptates et!
        Officiis, minima veniam. Harum dolorum sapiente voluptatem vel cum possimus! Rem culpa repellat eius asperiores libero earum, molestiae repudiandae praesentium, amet assumenda illo adipisci. Cumque aspernatur veritatis ea dolorem nostrum.
        Perspiciatis at saepe et beatae explicabo ea molestias! Dignissimos qui deleniti nisi aperiam! Ea assumenda in ut quasi eum illum? Ducimus inventore rerum, quisquam ipsa voluptatibus praesentium aliquam facilis corrupti!
        Iste perferendis corrupti, praesentium fugiat amet modi illum omnis cupiditate vel quisquam ab repellendus, reiciendis temporibus deleniti dignissimos rem cum repudiandae quidem! Tenetur minus sunt consequatur voluptatem doloribus explicabo architecto?
        Omnis, nesciunt facilis! Atque dolores provident possimus placeat aperiam, cumque ullam, beatae praesentium voluptas repellat facilis in dignissimos quasi recusandae aut nostrum sapiente earum, quaerat eos quibusdam corrupti deserunt quia!
        Reiciendis cum, nulla incidunt aliquam, veritatis doloribus reprehenderit, magnam expedita fugiat ratione nemo quas. Reiciendis architecto aperiam nobis quidem explicabo. Ad perferendis reprehenderit a ut inventore sed. Quia, voluptas perferendis.
        </div>
      </div></>
  )
}
