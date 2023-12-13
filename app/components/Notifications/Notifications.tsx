'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Notifications.module.scss'

import {Events} from '../../types'

interface Props {
    notifications: Events[] // should import Event type
}
export default function Notifications({notifications}: Props) {
    
          
     const offY:number[] = []
     notifications.map((n) => {
        const index = notifications.indexOf(n)
        const notificationEl = document.getElementById(`notification-${index}`)
        if(notificationEl) {
            offY.push(notificationEl.offsetHeight)
        }
     })

    const showNotification = (notification: Events, i:number) => {

        // const notificationsOnScreen = notifications.filter((notification) => {return notification.visible === true})
        // notificationsOnScreen.map((n, i) => {
        //     const index = notifications.indexOf(n)
        //     if(index) {
        //         console.log(`el ${i} should translate`, offY[index - 1])
        //     }
        // })
        return <div id={`notification-${i}`} className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>{offY[i]}</div>        
        // if(notification.type === 'goal') {
        //     return <div id={`notification${i}`} className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
        //         <h4>{i} Goal</h4>
        //         <p>Player: <b>{notification.player}</b></p>
        //         <p>Distance of shot: <b>{notification.distanceOfShot}m</b></p>
        //     </div>
        // } else if(notification.type === 'card') {
        //     return <div id={`notification${i}`} className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
        //         <h4>{i} {notification.cardType} card</h4>
        //         <p>Player: <b>{notification.player}</b></p>
        //     </div>
        // } else if(notification.type === 'endHalf') {
        //     return <div id={`notification${i}`} className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
        //         <h4>End first half</h4>
        //     </div>
        // } else if(notification.type === 'endGame') {
        //     return <div id={`notification${i}`} className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
        //         <h4>End game</h4>
        //     </div>
        // }    
    }

    return (
        <div className={styles.notifications}>
            {notifications.map((notification, i) => {
                return showNotification(notification, i)
            })}
        </div>    
    )
}