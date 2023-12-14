export interface Score {
    home: number
    away: number
}
export interface Events {
    id: string
    time: number
    type: string
    visible: boolean
    player?: string
    distanceOfShot?: number
    newScore?: Score
    cardType?: string
}
