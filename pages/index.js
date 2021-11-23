import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {


  // Link, Router.push


  // localhost:3000

  // localhost:3000/chat/1
  const Router = useRouter();

 

  async function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  } 
  useEffect(async () => {  
    await timeout(2500);
    Router.push("/chat/development");
  }, [Router]) 

  // useEffect : 

  return (
    <div className={styles.container}>
      <div className={styles.loading_container}>
        <Image className={styles.loading_image} src="home_page_loading.gif" alt=""/>
        <div>
          <h2>Recovering Profile Information . . .</h2>
        </div>
      </div>
    </div>
  )
}
