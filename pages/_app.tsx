import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/main.scss'
import { auth } from '../utils/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {Button, Snackbar, Alert} from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth)

  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async ()=>{
      try{
          const result = await signInWithPopup(auth, googleProvider)
          console.log(result.user)
      }
      catch(err){
          console.log(err)
      }
  } 

  return(
    //<Layout>
    <>
      {!user && !loading &&
      <Snackbar  
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={e=>console.log('q')}
      message="Note archived">
        
          <Alert severity='info' style={{fontSize: '18px'}}>
            Join the Glitter community with just one click &nbsp;
            <Button 
            onClick={GoogleLogin} 
            variant="contained"
            style={{display: 'inline-block'}}>
            Sign up / Sign in</Button> 
          </Alert>
        </Snackbar >
       }


      <Component {...pageProps} />
    </>
    //</Layout>
  ) 
}
