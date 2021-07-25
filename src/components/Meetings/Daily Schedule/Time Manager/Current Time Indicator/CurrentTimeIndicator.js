import { useEffect, useState } from 'react';
import classes from './CurrentTimeIndicator.module.css';

const CurrentTimeIndicator = props => {
    const [currMinute, setCurrMinute] = useState(new Date().getMinutes())
    let interval = null;
    
    useEffect(() => {
        interval = setInterval(() => {
            setCurrMinute(new Date().getMinutes())
        }, 60 * 1000)
    })

    useEffect(() => {
        return () => {
            console.log('current timer unmounts')
            if (interval) clearInterval(interval)
        }
    }, [])

    const { currHour } = props
    const hr = currHour, min = currMinute
    const acronym = (hr >= 12) ? 'pm' : 'am'
    const now = `${hr < 10 ? '0' + hr : (hr > 12 ? hr % 12 : hr)}:${min < 10 ? '0' + min : min} ${acronym}`

    return (
        <div 
            style={{top: `calc((5em / 60) * ${min})`}}
            className={`${classes['curr-time']} ${classes.active}`}
        >{now}
        </div>
    )
}

export default CurrentTimeIndicator