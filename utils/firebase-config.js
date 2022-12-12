import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBpxjUb00larWODGm9DdRU2VXwDCP63qCc",
  authDomain: "glitter-83003.firebaseapp.com",
  projectId: "glitter-83003",
  storageBucket: "glitter-83003.appspot.com",
  messagingSenderId: "329760684271",
  appId: "1:329760684271:web:9728ffb6a6f42b996ac31a"
};

initializeApp(firebaseConfig)
export const auth = getAuth()
