import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/main.scss'
import LoginAlert from '../components/LoginAlert'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {


  return(
    <>

    <LoginAlert></LoginAlert>
       
    <Layout>
      <Component {...pageProps} />
    </Layout>
     
    </>
  ) 
}
