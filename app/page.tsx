//'use client'

//import { useState, useEffect } from 'react'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import styles from './page.module.scss'

import data from "./data/data.json"


export default function Home() {
  return (
    <div className={styles.page}>
      <VideoPlayer data={data} />
    </div>
  )
}
