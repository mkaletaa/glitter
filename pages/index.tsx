import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, TextField, Alert } from '@mui/material';

export default function Home() {
  return (
    //<div className={styles.container}>
     <div className="homeContainer">
      <div className="nav">nawigacja</div>
      <div className="feed">feed</div>
      <div className="rightPanel">right panel</div>
     </div>
    //</div>
  )
}
