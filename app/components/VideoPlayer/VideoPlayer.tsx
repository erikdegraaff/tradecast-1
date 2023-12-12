'use client'
import React, { SyntheticEvent, useState } from 'react';
import styles from './VideoPlayer.module.scss'
import Notifications from '../Notifications/Notifications';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Button from '../Button/Button';
import Marquee from '../Marquee/Marquee'


interface Score {
    home: number
    away: number
}
interface Events {
    id: string
    time: number
    type: string
    visible: boolean
    player?: string
    distanceOfShot?: number
    newScore?: Score 
    }


interface Props {
    data: any
}

function isInTime(time: number, events: Events[]) {
}

export default function VideoPlayer({data}: Props) {
    const [events, setEvents] = useState<Events[]>(data.events.map((ev:Events) => {return {...ev, visible: false}}))
    const [paused, setPaused] = useState(true)
    const [score, setScore] = useState<Score | undefined>({home: 0, away: 0})
    const [gameTime, setGameTime] = useState('0:00')
    const [gameEnded, setGameEnded] = useState(false)

    const marqueeTexts:string[] = []
    data.ticker.map((tick: any) => {
      marqueeTexts.push(tick.body)
    })
  
    
    const handleTimeUpdate = (event: any) => {
        // 10 seconds is a minute in this case
        // the data is 90min, the sample video ~9min
        const currMin = Math.floor(event.target.currentTime / 60)
        const currSec = (Math.floor(event.target.currentTime % 60) / 100).toFixed(2)
        const currTime = currMin + parseFloat(currSec)
        const currTimeStr = `${currTime.toFixed(2)}`.replace('.',':')
        setGameTime(currTimeStr)

        // event is visible
        const checkedEvents = events.map((ev, i) => {
            const eventTime = parseFloat((ev.time/10).toFixed(2))
            if(eventTime + 0.05 >= currTime && eventTime <= currTime) {
                return {...ev, visible: true}
            } else {
                return {...ev, visible: false}
            }
        })   
        setEvents(checkedEvents)

        // get latest score
        const scores = events.filter((ev, i) => {
            const eventTime = parseFloat((ev.time/10).toFixed(2))
            if(ev.type === 'goal') {
                if(eventTime <= currTime) {
                    return ev
                }
            }
        })
        scores.sort((a, b) => {return a.time - b.time})

        const score = scores.length ? scores[scores.length - 1].newScore : {home: 0, away: 0}
        setScore(score)

        // game ended
        const gameEndedTime = parseFloat((events.filter((ev) => {return ev.type === 'endGame'})[0].time/10).toFixed(2))
        if(currTime > gameEndedTime + 0.05) {
            setGameEnded(true)
        }
    }

    console.log(gameEnded)

    return (
        <div className={styles.videoPlayer}>
            <ScoreBoard gameTime={gameTime} score={score}>
                <Marquee texts={marqueeTexts} delimiter='&nbsp;&nbsp;&bull;&nbsp;&nbsp;' duration={0.5} paused={paused} />
            </ScoreBoard>
            <Notifications notifications={events}></Notifications>
            <video muted controls onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onTimeUpdate={handleTimeUpdate}>
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>          
        </div>
    )
}
  