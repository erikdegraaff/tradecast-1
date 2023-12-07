//'use client'

//import { useState, useEffect } from 'react'
import Marquee from './components/Marquee/Marquee'
import Video from './components/Video/Video'
import Notifications from './components/Notifications/Notifications'
import styles from './page.module.scss'

import data from "./data/data.json"


export default function Home() {

  const marqueeTexts:string[] = []
  
  data.ticker.map((tick) => {
    marqueeTexts.push(tick.body)
  })
  
  return (
    <div className={styles.page}>
      <Notifications />
      <Video />
      <Marquee texts={marqueeTexts} delimiter='&nbsp;&bull;&nbsp;' duration={0.5} />
    </div>
  )
}
