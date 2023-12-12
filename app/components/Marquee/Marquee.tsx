'use client'

import { useRef, useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './Marquee.module.scss'

interface Props {
    texts: string[]
    delimiter: string
    duration: number
    reversed?: boolean
    paused?: boolean
}

export default function Marquee({
    texts,
    delimiter,
    duration,
    reversed,
    paused  
} : Props) {
    const [width, setWidth] = useState({compWidth: 0, textWidth: 0})        
    const windowSize = useWindowSize()

    const compRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const compWidth = compRef && compRef.current ? compRef.current.offsetWidth : 0
        const textWidth = textRef && textRef.current ? textRef.current.offsetWidth : 0

        setWidth({
            compWidth, textWidth
        })
    }, [windowSize])

    const marqueeText = `${texts.join(delimiter)}${delimiter}`
    const numCopies = Math.ceil(width.compWidth / width.textWidth) + 1

    let textShadow = `${width.textWidth}px 0 currentColor,`
    for(let i = 2; i < numCopies; i++) {
        textShadow += ` calc(${width.textWidth}px * ${i}) 0 currentColor,`
    }
    textShadow = textShadow.slice(0, -1)

    const animationDuration = `${(width.textWidth / width.compWidth) * (duration * (width.compWidth / 20))}s`
    const animationDirection = reversed ? 'reverse' : 'normal'
    const animationPlayState = paused ? 'paused' : 'running'
    const opacity = width.textWidth > 0 ? 1 : 0

    return (
        <div className={styles.marquee} ref={compRef} style={{opacity}}>
            <span ref={textRef} style={{textShadow, animationDuration, animationDirection, animationPlayState}}>{marqueeText}</span>            
        </div>
    )
}