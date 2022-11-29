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
     <div className='topBarMain'>cececec</div>
     <div className='topBarRight'>cececec</div>
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
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas perferendis reiciendis consectetur saepe dignissimos eius ab, optio ratione eos officia, asperiores error nesciunt architecto tenetur ducimus minus necessitatibus maxime sequi!
       Explicabo voluptatum qui blanditiis quis amet quisquam vitae impedit quia, non, at fugit dolorem a labore enim facere ad porro magnam odio, quod corporis! Iste sunt eos obcaecati harum vel.
       Ipsam, minima quod. Quos rem cumque esse libero, possimus praesentium iusto maiores aspernatur deleniti quidem quis, quo maxime odit, fugiat eaque deserunt at voluptatum! Placeat pariatur officiis architecto deserunt eaque.
       Sit non iusto fugit soluta exercitationem aspernatur ex ipsa, aperiam assumenda aliquid itaque unde quis possimus ad quo accusamus odio doloremque atque cumque! Est, ut similique! Quam voluptatum esse minus.
       Atque alias tempora tempore expedita, suscipit delectus quo dolor quibusdam, provident hic voluptatibus voluptate molestias repellat voluptatem ab maiores earum dignissimos sunt dolore. Vero iste, placeat laudantium quibusdam hic est.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur 
      </div>


         
            <div className="rightPanel" >

              <div>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat volu Lorem 
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, recusandae, quia, itaque expedita incidunt necessitatibus voluptatum magnam dolorum nulla non ratione quidem possimus culpa voluptatem ab doloremque repudiandae eum exercitationem!
        Rerum aperiam reprehenderit sed sunt, placeat itaque neque nam quam optio iste. Architecto optio, deserunt, ipsum quisquam vitae quas harum est voluptates animi vero ullam molestiae assumenda velit possimus praesentium.
        Laborum ad provident aliquid aut sit quae dolorem aliquam? Laudantium corrupti id voluptas quaerat molestiae amet nemo quae? Dolor, cupiditate. Ex repellat eum ullam consequuntur cupiditate quidem nobis asperiores hic?
        Ab commodi consequuntur voluptatibus repudiandae maxime soluta, animi quasi tenetur officiis? Vel nisi ipsam aperiam eius eos sit nostrum explicabo, excepturi quaerat voluptatem at esse iure blanditiis. Earum, iste ullam.
        Et obcaecati libero ullam architecto voluptas, labore corporis repellat velit quos natus facere blanditiis praesentium aliquam magnam unde error at, accusantium asperiores quas eum in. Repudiandae maiores explicabo autem soluta.
        Atque alias blanditiis a cupiditate nemo quibusdam odio dolore, sapiente placeat minima provident! Nemo iste suscipit iusto aliquid, aspernatur, mollitia in vero, ipsum laboriosam maxime eum ad cum numquam placeat!
        Qui nesciunt sequi sapiente at quia voluptas fuga, ullam debitis eaque, et repellendus magni consectetur nihil aliquid nostrum dolor. Accusamus aut vero quaerat vel mollitia velit, architecto error eligendi aliquid.
        Laborum, reprehenderit! Placeat aspernatur error vel explicabo architecto dicta aperiam unde natus eius laboriosam, corrupti tempora inventore ipsam tenetur veniam necessitatibus? Error exercitationem ea architecto temporibus ipsa consequatur ut cum?
        Molestiae laborum asperiores eius iusto tenetur velit, eum, nostrum maiores, commodi repellat explicabo quam ea iure labore nihil dolorem necessitatibus sed saepe quasi fuga repellendus? Aliquam officia hic corrupti culpa.
        Aliquam, cupiditate mollitia? Aperiam recusandae et sit quisquam deserunt voluptatum minus ab facere, doloremque impedit totam veniam excepturi porro voluptate minima dignissimos exercitationem sunt rerum beatae velit molestiae non obcaecati?
        Autem voluptate repellendus natus praesentium assumenda delectus placeat molestiae illo asperiores ipsum sequi eveniet doloremque expedita iure, eligendi ducimus sapiente nobis quaerat reprehenderit, tempore nostrum! Quaerat vero tempora harum recusandae.
        Asperiores, sit ipsum! Dolorum deserunt ullam recusandae consequatur accusamus, sint quae exercitationem consectetur debitis suscipit minima, neque quia placeat quod modi nemo cupiditate nostrum vero asperiores beatae! Ea, ut aliquam!
        Sint reiciendis quaerat quae doloribus atque totam doloremque numquam. Voluptas unde aspernatur possimus, magni iusto ipsam quisquam, quam ex, expedita eos nisi saepe. Suscipit fugit, earum rem adipisci assumenda vel.
        Consectetur totam, provident, corrupti non officiis nemo facere neque et dolor error labore quisquam? Aspernatur dolorem assumenda, cupiditate praesentium neque eaque fuga dolore, in ab quod odio alias ut magni.
        Id suscipit corporis cumque beatae consequuntur est ipsum, laborum consectetur nisi voluptatem quasi optio eum nihil dolore, eveniet, in repudiandae culpa atque voluptate sapiente odit repellat facilis excepturi. Sed, assumenda.
        Praesentium, explicabo autem, ipsa reiciendis maiores repellendus optio quod beatae neque, adipisci aliquam corporis aperiam? Libero iusto impedit, amet officia ipsam ea commodi molestias deserunt maxime pariatur expedita voluptate dolor!
        Hic sed iusto nobis, voluptatum harum, aliquid est alias ipsum reiciendis fuga voluptates temporibus sunt placeat quas illo provident eos earum corrupti omnis nulla nisi? Tenetur officia voluptatibus sit ex!
        Commodi voluptatem dolore nam porro! Officiis, ullam velit sequi expedita architecto recusandae aspernatur quos, atque, eligendi magnam deserunt cupiditate. Nostrum beatae veniam hic est quisquam nemo inventore. Illum, commodi nam?
        Perspiciatis facere in sapiente ab laboriosam, facilis, earum impedit sit exercitationem blanditiis distinctio perferendis ullam. Veritatis dignissimos atque quibusdam fuga aliquam aliquid odit reiciendis officia hic, facilis, corporis dicta nihil!
        Soluta facere recusandae, doloremque eveniet animi numquam, labore harum inventore quas nihil libero tempora. Iusto eos cum reiciendis repellendus, praesentium ea eum eligendi! Magnam officiis dolore ipsam magni facilis laboriosam?
              </div>
        </div>
      </>
  )
}
