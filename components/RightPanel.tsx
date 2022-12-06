import React, {useEffect} from 'react'
import { useRouter } from 'next/router';
import right from '../styles/rightPanel.module.scss'
import {Card, List, ListItemButton, Avatar} from '@mui/material'

export default function RightPanel() {
  const router = useRouter()


  return (
    <div className='rightPanel'  >RightPanel

    <button onClick={e=>router.push('/profile/V76dW2lLHec1OFAbxRJdxnXJtbM2')}>goooo</button>
      
        <Card   className={right.cards}>

       Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum suscipit necessitatibus accusamus neque aliquid deserunt cumque eum excepturi, molestias itaque voluptatum corrupti quam aperiam quasi perspiciatis vitae dolorum tenetur odit.
            dede</Card>

            <List className={right.cards}>
              Recommended people:
              <ListItemButton>ded</ListItemButton>
              <ListItemButton>ded</ListItemButton>
              <ListItemButton>ded</ListItemButton>
              <ListItemButton>ded</ListItemButton>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium earum doloremque quas? Cupiditate nostrum illum quae iste repudiandae nihil, aperiam asperiores quam, sit aut sequi, dolore ea veniam magnam. Nemo.
              Dolorem recusandae ratione enim nemo ea, nisi magni cupiditate voluptates, at consectetur consequuntur est neque a ullam dignissimos libero fugiat quas sequi? Magnam doloremque fugiat quis neque eligendi error libero!
              Consequuntur, mollitia! Natus officia enim fugit placeat dolores, repellat tempore quidem iusto, illum repudiandae accusantium praesentium neque exercitationem quisquam obcaecati corporis, alias necessitatibus modi repellendus non! Eius veniam dolore distinctio.
              Minus, eligendi? Culpa reprehenderit sed error alias, vitae dolorem harum sint tempore eum. In omnis, architecto ullam ipsam perferendis nisi maiores quasi molestiae maxime, hic nemo iusto repellat illum animi.
              Minus, inventore ex sint dolores quaerat minima nulla, totam nesciunt laboriosam nobis iure libero aliquid! Laudantium saepe iure ab recusandae eum amet! Itaque autem nostrum eum velit facere maxime obcaecati!
              Quibusdam error repellat, veritatis dicta rerum quos voluptatum ducimus vel nostrum illum officiis consectetur nemo eaque repudiandae suscipit esse eos. Nam pariatur, optio quae beatae fugiat illum excepturi maxime quibusdam!
              Quos minima aut alias, ab dicta, nulla aliquid ea repellat libero quae, nihil eligendi unde rerum officiis ullam minus maxime expedita consequatur consequuntur recusandae explicabo officia. Unde voluptatibus distinctio optio.
              Ipsum, cupiditate quo! Assumenda doloremque sed dolor totam hic deserunt! Accusamus excepturi amet asperiores voluptatum. Numquam provident iste voluptate perspiciatis, molestiae laudantium obcaecati exercitationem cupiditate laboriosam culpa vel placeat reprehenderit!
              Labore ipsum consequatur ipsam doloremque sunt pariatur quis ducimus obcaecati eos, dolor ullam minima et exercitationem atque quibusdam error neque itaque libero officiis corrupti. Est obcaecati explicabo corrupti rerum eveniet.
              Ducimus quo praesentium dolor fugit. Repellat non temporibus quasi tempora dolorum! Odio facere, assumenda optio enim voluptatum minus accusamus. Nulla incidunt asperiores sequi dolore molestias sunt explicabo ea voluptate dignissimos.
            </List>

    </div>
  )
}
