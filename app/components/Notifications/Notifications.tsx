'use client'

import { useState, useEffect } from 'react'
import styles from './Notifications.module.scss'

interface Notification {
    type: string
}
interface NotificationProps {
    notifications: any[]
}
export default function Notifications({notifications}: NotificationProps) {

    const showNotification = (notification: any, i:number) => {
        if(notification.type === 'goal') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <p>Player: <b>{notification.player}</b></p>
                <p>Distance of shot: <b>{notification.distanceOfShot}m</b></p>
            </div>
        } else if(notification.type === 'card') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <p>Player: <b>{notification.player}</b></p>
                <p>Card: <b>{notification.cardType}</b></p>
            </div>
        } else if(notification.type === 'endHalf') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <p><b>End first half</b></p>
            </div>
        } else if(notification.type === 'endGame') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <p><b>End game</b></p>
            </div>
        }
    }
    return (
        <div className={styles.notifications}>
            {notifications.map((notification, i) => {
                return showNotification(notification, i)
            })}
        </div>    
    )
}