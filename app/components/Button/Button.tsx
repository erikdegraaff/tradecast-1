import { ReactNode } from 'react'
import styles from'./Button.module.scss'

interface Props {
  onClick: any
  children: ReactNode
}

export default function Button({onClick, children} : Props) {
    return (
      <button className={styles.button} onClick={onClick}>{children}</button>
    )
  }
  