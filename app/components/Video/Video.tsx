'use client'
import React, { SyntheticEvent } from 'react';
import styles from './Video.module.scss'

interface EventTimes {
    [key: number] : string
}

export default function Video() {
    const test: EventTimes = {
        1: 'een',
        6: 'zes'
    }
    let lastEventTime = 0
    const handleTimeUpdate = (event: any) => {
        // minutes + seconds / 10 as minutes...
        // the data is 90min, the sample video ~9min
        // so 5:56 translates as 55 to match the data format
        const currMin = Math.floor(event.target.currentTime / 60)
        const currSec = Math.floor(event.target.currentTime % 60 / 10)
        const currEventTime = parseInt(`${currMin}${currSec}`)

        if(currEventTime in test && lastEventTime !== currEventTime) {
            console.log(test[currEventTime])
            lastEventTime = currEventTime
        }
    }

    return (
        <div className={styles.video}>
            <video muted controls onTimeUpdate={handleTimeUpdate}>
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>          
        </div>    
    )
}
  