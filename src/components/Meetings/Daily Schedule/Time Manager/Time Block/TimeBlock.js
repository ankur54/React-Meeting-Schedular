import { useEffect } from 'react';
import classes from './TimeBlock.module.css'

const TimeBlock = prop => {
    let { startTime, children } = prop
    const acronym = startTime >= 12 ? 'pm' : 'am'
    startTime = (startTime > 12) ? startTime % 12 : startTime;
    startTime = (startTime === 0) ? startTime + 12 : startTime;

    return (
        <div className={classes['schedule-time']}>
            {children}
            <div className={classes['time-start']}>
                {`${startTime} ${acronym}`}
            </div>
        </div>
    )
}

export default TimeBlock;