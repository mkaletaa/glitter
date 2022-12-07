import '../styles/global.scss'
import '../styles/main.scss'
import type { AppProps } from 'next/app'
import LoginAlert from '../components/LoginAlert'
import Layout from '../components/Layout'
import {useRouter} from 'next/router'
import { QueryClientProvider, QueryClient } from 'react-query'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react'

const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const {useState} = React
  const [mode, setMode] = useState<any>('dark')
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  function toggleMode(){
    setMode(mode==='light' ? 'dark' : 'light')
  }

  return(
    <>
    <QueryClientProvider client={queryClient} >
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LoginAlert></LoginAlert>

      <Layout mode={toggleMode}>
        <Component {...pageProps} />
      </Layout>    
      </ThemeProvider>
    </QueryClientProvider>
    </>
  ) 

  if(router.asPath =='/me/settings')  {
    return (
      <QueryClientProvider client={queryClient} >
        <Component {...pageProps} />
      </QueryClientProvider>
    )
  }


}
