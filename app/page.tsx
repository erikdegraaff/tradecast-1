import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import data from "./data/data.json"

import styles from './page.module.scss'

export default function Home() {

  return (
    <div className={styles.page}>
      <VideoPlayer data={data} />
    </div>
  )
}
