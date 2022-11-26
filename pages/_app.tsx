import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/main.scss'
import LoginAlert from '../components/LoginAlert'
import Layout from '../components/Layout'
import {useRouter} from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
const router = useRouter()

if(router.asPath =='/xxx')  {
  return (
    <Component {...pageProps} />
  )
}

  return(
    <>

    <LoginAlert></LoginAlert>
       
    <Layout>
      <Component {...pageProps} />
    </Layout>
     
    </>
  ) 
}
