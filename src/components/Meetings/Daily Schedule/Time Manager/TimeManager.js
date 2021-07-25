import classes from './TimeManager.module.css'

import TimeBlock from "./Time Block/TimeBlock";
import CurrentTimeIndicator from './Current Time Indicator/CurrentTimeIndicator';
import MeetingBlock from './Meeting Block/MeetingBlock';
import { useEffect, useState } from 'react';

const TimeManager = props => {
    const { onEventClick } = props
    const [currHr, setCurrHr] = useState(new Date().getHours())
    let interval = null;
    const meetings = [
        {
            _id: "60f7bf0af05efa0ab505878c",
            title: "Meeting 1",
            description: "My meeting",
            startTime: "16:00",
            endTime: "16:20"
        },
        {
            _id: "60f7c0a38aaf7e0b82398ca5",
            title: "Meeting 2",
            description: "My meeting",
            startTime: "16:30",
            endTime: "16:45"
        },
        {
            _id: "60f82b9d0465fd1e812d7f31",
            title: "Meeting 3",
            description: "My meeting",
            startTime: "18:00",
            endTime: "18:50"
        },
        {
            _id: "60f7bf0af05efa0ab505878d",
            title: "Meeting 4",
            description: "Valorant meeting to play games with friends",
            startTime: "20:00",
            endTime: "22:30"
        }
    ]

    // update hour every 60 * 60 * 1000 ms interval
    useEffect(() => {
        setInterval(() => {
            setCurrHr(new Date().getHours())
        }, 60 * 60 * 1000)
    })

    // clear timer on component unmount
    useEffect(() => {
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [])

    let idx = 0;
    const timeBlocks = [...Array(24).keys()].map(hour => {
        const meetingList = []
        while (idx < meetings.length) {
            const meetingStartHour = parseInt(meetings[idx].startTime.split(':')[0])
            if (meetingStartHour && meetingStartHour === hour) {
                meetingList.push(meetings[idx++])                
            }
            else break;
        }

        return (
            <TimeBlock 
                key={`${hour}:00`}
                startTime={hour}
            >
                {(currHr === hour) && 
                <CurrentTimeIndicator currHour={hour} />}
                <MeetingBlock 
                    meetings={meetingList}
                    onEventClick={onEventClick}
                />
            </TimeBlock>
        )
    })
    return (
        <div 
            className={classes['schedule-display']}>
            {timeBlocks}
        </div>
    )
}

export default TimeManager