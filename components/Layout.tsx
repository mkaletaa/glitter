import React from 'react'
import Nav from '../components/Nav'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
  
// console.log(user)
  // if (typeof window != "undefined") { 
  //   console.log(window.scrollY)
  //   }

  //   const rightPanel = useRef<HTMLDivElement>(null)
    
  //   const handleScroll = (scroll:any) => {
  //     console.log('eeded')
  //     window?.scrollBy(0, document.querySelector('.rightPanel')?.scrollTop)
  //   };

  //   useEffect(()=>{
  //     window?.addEventListener('scroll', e=>console.log('body'))
  //   }, [])

  return (
    <>
     <div className="homeContainer" onScroll={e=>alert('dd')}>

      <Nav></Nav>

        <div className='topBar'>cececec</div>
        {/* <div className='topBar'>cecfddfecec</div> */}

      <div className="feed" >

      {children}
       
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tenetur cum, eveniet quod corrupti quis impedit reiciendis veniam, nostrum, blanditiis est sint. Nobis, aperiam? Recusandae quibusdam enim culpa esse aspernatur?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo neque, pariatur facilis quasi deleniti minima non voluptas, ipsum laboriosam atque est. Obcaecati porro laboriosam magnam ea quo at omnis consectetur!
        Assumenda molestias illo accusantium ex, quas velit veniam doloremque in tempora, aliquam fuga eos nam, explicabo nisi ad dolores quasi saepe modi asperiores accusamus reiciendis. Necessitatibus voluptates numquam sed ea.
        Rem, dolores. Ex id provident impedit neque beatae nostrum rerum voluptatum porro! Nisi, vel tempora autem enim quos eaque expedita, odit blanditiis cumque, non eum recusandae impedit harum velit totam?
        Asperiores rerum mollitia consectetur facilis quis enim, quasi expedita numquam, consequatur, officiis illo sint hic dolor reiciendis qui modi odit? Quis voluptatibus similique ex voluptate alias culpa dolore repellendus consectetur.
        Laudantium eos architecto repellendus labore! Consequatur quidem totam qui cum. Aperiam, dolorum! Voluptas at illo eos beatae rerum repellendus quas ipsum blanditiis aliquam soluta unde facere sint quae, deserunt sequi.Laudantium eos architecto repellendus labore! Consequatur quidem totam qui cum. Aperiam, dolorum! Voluptas at illo eos beatae rerum repellendus quas ipsum blanditiis aliquam soluta unde facere sint quae, deserunt sequi.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, aliquid. Molestias, harum? Distinctio sapiente officia quisquam temporibus eligendi, nam eos, veritatis vitae, voluptatem rem dolorum! Sed sequi ad voluptatem a.
        Atque nisi voluptatem mollitia sapiente, quod quidem molestiae veritatis cum labore dolore consectetur non eos voluptates cumque repellat eveniet, reiciendis illum sed deleniti vitae aut animi excepturi debitis! Nulla, adipisci?
        Natus, ad voluptates commodi accusamus aspernatur, nobis iure dolorum asperiores dignissimos nemo, minima id repudiandae quidem! Temporibus tenetur debitis incidunt amet, corporis, nihil doloremque enim, ut obcaecati ipsum fugiat excepturi.
        Dolore nisi ullam ratione nihil aperiam fugit labore culpa aliquam, odit voluptas commodi, cum a harum eveniet enim at est accusantium impedit ab eaque! Ab mollitia nulla tempora! Numquam, consequuntur.
        Ipsa, veniam dignissimos quisquam at ad repudiandae rem pariatur perspiciatis sunt odio repellendus consectetur magni praesentium, animi consequatur aut? Delectus culpa soluta aspernatur sapiente necessitatibus corporis nihil aliquam autem sed.
        Illo, saepe delectus. Minus, assumenda. Molestias excepturi optio ipsa cupiditate, quia in voluptates fugiat culpa vero, eaque nihil blanditiis, nostrum amet delectus. Ad repellat fugit nemo molestiae saepe ipsum ullam!
        Consequatur, accusamus provident? Nostrum nemo dolore autem fugit unde et magnam aliquid ipsum, tenetur mollitia quidem nisi voluptatum quisquam eos nobis reprehenderit quibusdam sit saepe dolor architecto. Maxime, eos voluptas?
        Eligendi adipisci magni totam unde quo architecto quam atque. Ab similique, expedita doloribus voluptatem accusantium id quibusdam eligendi obcaecati quo incidunt, ullam fugit hic perspiciatis fugiat beatae, a culpa fuga.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita aspernatur fuga adipisci possimus ratione, culpa autem, excepturi tempore fugiat vero commodi minus, sed eaque laboriosam soluta. Optio nisi ratione natus.
        Doloremque reprehenderit vitae iure, deleniti cupiditate sapiente atque quibusdam eum vel hic deserunt. Debitis nulla, in minus, vel culpa sapiente soluta sed enim repellendus consectetur inventore necessitatibus blanditiis itaque eligendi?
        Magni sapiente, odit facere quidem quod maxime deleniti illo adipisci praesentium, rem commodi. Ullam sunt dolorem saepe sint? Architecto veniam odio sunt. Qui excepturi nobis quod! Autem consequuntur sint pariatur.
        Totam facere nam tempora minima. Explicabo expedita tempora ipsa sed vitae optio sit soluta, placeat iusto. Explicabo ex consequuntur voluptatibus aliquid aut itaque quia inventore, rem nemo odit nostrum voluptate.
        Sit repudiandae corrupti ullam quas dolorum nobis, officia esse. Iure quis nostrum et odio. Ipsam reiciendis magnam, unde eos dolores voluptas! Harum ut excepturi doloribus, vel voluptate culpa aut commodi!
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam accusamus praesentium inventore, repudiandae vero illo, omnis eum earum saepe quisquam quo cumque aut, cupiditate dignissimos. Doloremque est nam reiciendis sunt.
        Quidem fuga quo debitis ab deserunt iure similique repellendus fugit quisquam, minima perspiciatis non quas cum nostrum ducimus, sit est nam. Explicabo ex sunt vitae sequi dignissimos delectus tempore corrupti.
        Doloremque corrupti voluptatum recusandae debitis blanditiis suscipit vel, tenetur eligendi voluptatibus vero dolorum quasi. Praesentium magni minima, rerum, fuga assumenda est asperiores sunt cupiditate expedita iste dolorum, quas voluptas! Modi?
        Rerum iste ducimus quae nulla eius! Nihil eos maxime, perspiciatis voluptates corporis voluptas reprehenderit exercitationem quae eligendi velit est ut deleniti saepe praesentium necessitatibus quisquam culpa molestias, autem nesciunt? Molestias?
        Vero sint placeat deserunt in reprehenderit nemo, sapiente neque distinctio corporis perferendis dignissimos earum ab ullam rerum, nesciunt eius cum harum. Aliquam officia recusandae, labore distinctio nihil voluptates ducimus nam?
        Sint ad commodi voluptates perspiciatis reprehenderit, voluptatibus nisi inventore atque quas ab architecto eveniet hic quae necessitatibus dicta ea minus sed nobis adipisci autem enim facere sit! Sunt, fugit ipsum!
        Necessitatibus incidunt totam praesentium quo! Quia nemo odio error, reprehenderit sit laudantium ea eos repellendus aliquid, nulla illum saepe iure cumque alias magnam quo voluptate. Eius quae tempore impedit nihil.
        Adipisci maiores quidem voluptas, ab reiciendis totam ipsa expedita dolorem molestiae eveniet facere ut. Natus omnis nobis consequuntur reiciendis delectus similique ab sint quo, quod cumque. Consectetur voluptatibus eaque facere!
        Eaque veniam culpa beatae dolor molestiae error minima dolores dolorum, sed placeat? Facilis expedita dolorum consequatur laboriosam, magni quasi molestias quibusdam, cum iure, autem possimus? Voluptas optio cum necessitatibus vero.
        Aspernatur sint eaque ex non ad deserunt at, ab reprehenderit repudiandae, magni tenetur, similique qui. Maxime, error, sint nostrum aspernatur repellat veritatis ullam consectetur illo, sed quisquam delectus fugiat maiores.
      </div>


      <div className="rightPanel" >
        <div>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat volu Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, accusantium sunt eius eaque iste, neque vitae consequuntur velit, dignissimos nemo necessitatibus. Hic perspiciatis ipsum explicabo. Eligendi hic molestias dolore veritatis?
        Nobis ipsam sequi illo saepe culpa at? Molestiae dolor voluptatum blanditiis ducimus laborum corrupti quos quasi tempore? Architecto adipisci minus, ratione saepe accusantium perferendis, pariatur id veritatis et nihil esse? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore tenetur eum impedit iste, nisi illum quasi, assumenda aliquam veritatis explicabo repellat dignissimos cumque ratione vel odit accusamus qui reprehenderit voluptatum.
        Ratione excepturi cumque sit voluptas architecto libero hic praesentium nam nihil sunt, doloribus pariatur repellendus ex. Veritatis numquam praesentium, vel rerum laborum, excepturi provident sunt eum soluta vero qui quae.
        Culpa totam sequi provident distinctio ipsa? Excepturi voluptatem atque, corporis voluptas corrupti commodi molestias qui fugiat error ullam soluta fugit. Eveniet molestiae autem enim quas, eaque sit doloremque nostrum neque.
        Nobis officia autem consequuntur, earum quia nostrum debitis odit doloremque possimus velit quo assumenda totam veritatis impedit. Rem maiores, commodi error, aperiam vitae dolorem a asperiores illo veritatis omnis quibusdam.
        Fugiat, consectetur ratione? Alias commodi expedita, facere ad perferendis velit voluptas atque dolor vitae et aperiam ea reprehenderit dolorem accusantium repellat sunt dicta placeat blanditiis dolores praesentium repellendus nobis exercitationem! 
        lorem*20
        </div>
      </div>

     </div>

    </>
  )
}

//TODO:  get rid of horizontal scrollbar which appears for some reason
//TODO: make scrolls on columns behave like on twitter (or even different if needed)
//TODO: 
