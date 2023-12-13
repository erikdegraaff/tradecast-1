'use client'

import React, { SyntheticEvent, useState, useRef } from 'react';
import styles from './VideoPlayer.module.scss'

import {Score, Events} from '../../types'

import Notifications from '../Notifications/Notifications';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import Button from '../Button/Button';
import Marquee from '../Marquee/Marquee'
import Overlay from '../Overlay/Overlay'
interface Props {
    data: any
}

export default function VideoPlayer({data}: Props) {
    const [events, setEvents] = useState<Events[]>(data.events.sort((a: Events, b: Events) => {return a.time - b.time}).map((ev:Events) => {return {...ev, visible: false}}))
    const [paused, setPaused] = useState(true)
    const [score, setScore] = useState<Score | undefined>({home: 0, away: 0})
    const [gameTime, setGameTime] = useState('0:00')
    const [gameEnded, setGameEnded] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)

    const gameEndedTime = parseFloat((events.filter((ev) => {return ev.type === 'endGame'})[0].time/10).toFixed(2))

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
        const score = scores.length ? scores[scores.length - 1].newScore : {home: 0, away: 0}
        setScore(score)

        setGameEnded(currTime > gameEndedTime + 0.05)
    }

    const replayVideo = () => {
        if(videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
            setGameEnded(false)
        }
    }

    //const eventsOnScreen = events.filter((ev) => {return ev.visible === true})

    return (
        <div className={styles.videoPlayer}>
            <Overlay visible={gameEnded}>
                <Button onClick={replayVideo}>Replay Video</Button>
            </Overlay>
            <ScoreBoard gameTime={gameTime} score={score}>
                <Marquee texts={marqueeTexts} delimiter='&nbsp;&nbsp;&bull;&nbsp;&nbsp;' duration={0.5} paused={paused} />
            </ScoreBoard>
            <Notifications notifications={events}></Notifications>
            <video muted controls ref={videoRef} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onTimeUpdate={handleTimeUpdate}>
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>          
        </div>
    )
}
  