// import Button from './components/Button/Button'
import Marquee from './components/Marquee/Marquee'
import Video from './components/Video/Video'
import Notifications from './components/Notifications/Notifications'
import styles from './page.module.scss'

export default function Home() {

  const marqueeTexts = ['Halloa', 'world', 'how', 'are', 'you', 'today']
  
  return (
    <div className={styles.page}>
      <Notifications />
      <Video />
      <Marquee texts={marqueeTexts} delimiter='&nbsp;&bull;&nbsp;' duration={0.8} />
    </div>
  )
}
