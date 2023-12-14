import {Events} from '../../types'

import styles from './Notifications.module.scss'

interface Props {
    notifications: Events[]
}
export default function Notifications({notifications}: Props) {

    const showNotification = (notification: Events, i:number) => {
        if(notification.type === 'goal') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <h4>Goal</h4>
                <p>Player: <b>{notification.player}</b></p>
                <p>Distance of shot: <b>{notification.distanceOfShot}m</b></p>
            </div>
        } else if(notification.type === 'card') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <h4>{notification.cardType} card</h4>
                <p>Player: <b>{notification.player}</b></p>
            </div>
        } else if(notification.type === 'endHalf') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <h4>End first half</h4>
            </div>
        } else if(notification.type === 'endGame') {
            return <div className={`${styles.notification} ${notification.visible ? styles.visible : ''}`} key={i}>
                <h4>End game</h4>
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