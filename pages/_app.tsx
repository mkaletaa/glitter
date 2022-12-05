import '../styles/global.scss'
import '../styles/main.scss'
import type { AppProps } from 'next/app'
import LoginAlert from '../components/LoginAlert'
import Layout from '../components/Layout'
import {useRouter} from 'next/router'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {


const router = useRouter()

if(router.asPath =='/xxx')  {
  return (
    <Component {...pageProps} />
  )
}

  return(
    <>
    <QueryClientProvider client={queryClient} >
      <LoginAlert></LoginAlert>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
    </>
  ) 
}
