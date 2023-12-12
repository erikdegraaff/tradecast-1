import { ReactNode } from "react";
import styles from './ScoreBoard.module.scss'

interface Score {
  home: number
  away: number
}

interface ScoreBoardProps {
  gameTime: string
  score: Score | undefined
  children: ReactNode
}

export default function ScoreBoard({gameTime, score, children} : ScoreBoardProps) {
    return (
      <div className={styles.scoreBoard} >
        <p className={styles.time}>{gameTime}</p>
        <p className={styles.score}><span>Home</span> {score && score.home} - {score && score.away} <span>Away</span></p>
        {children}
      </div>
    )
  }
  