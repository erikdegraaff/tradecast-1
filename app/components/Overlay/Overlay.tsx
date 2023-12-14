import { ReactNode } from 'react'

import styles from './Overlay.module.scss'
interface Props {
    visible: boolean
    children?: ReactNode
}

export default function Overlay({ visible, children }: Props) {
    return (
        <div className={`${styles.overlay} ${visible ? styles.visible : ''}`}>
            {children}
        </div>
    )
}
