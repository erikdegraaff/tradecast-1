import { ReactNode } from 'react'
import { Score } from '@/types/'

import styles from './ScoreBoard.module.scss'
interface Props {
    gameTime: string
    score: Score
    children: ReactNode
}

export default function ScoreBoard({ gameTime, score, children }: Props) {
    return (
        <div className={styles.scoreBoard}>
            <p className={styles.time}>{gameTime}</p>
            <p className={styles.score}>
                <span>Home</span> {score && score.home} - {score && score.away}{' '}
                <span>Away</span>
            </p>
            {children}
        </div>
    )
}
