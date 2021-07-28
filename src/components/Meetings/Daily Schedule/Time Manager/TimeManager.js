import classes from './TimeManager.module.css'

import TimeBlock from "./Time Block/TimeBlock";
import CurrentTimeIndicator from './Current Time Indicator/CurrentTimeIndicator';
import MeetingBlock from './Meeting Block/MeetingBlock';
import { meetingActions } from '../../../../store/MeetingStore'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TimeManager = props => {
    const { date } = props
    const [currHr, setCurrHr] = useState(new Date().getHours())
    
    const token = useSelector(state => state.authentication.token)
    let meetings = [...useSelector(state => state.meeting.meetings)]
    meetings.sort((meeting1, meeting2) => {
        const hour1 = +(meeting1.startTime.split(':')[0])
        const hour2 = +(meeting2.startTime.split(':')[0])
        return hour1 - hour2
    })
    
    const dispatch = useDispatch()

    const startTime = '00:00'
    const endTime = '23:59'
    console.log(meetings)

    useEffect(async () => {
        try {
            let response = await fetch(
                `http://localhost:8000/meeting?date=${date}&startTime=${startTime}&endTime=${endTime}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            response = await response.json()

            if (response.error) throw new Error(response.error)
            dispatch(meetingActions.getMeetings([ ...response ]))
        }
        catch (error) {
            console.log(error.message)
        }
    }, [date, startTime, endTime])

    let interval = null;

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

    const onEventClick = meetingId => {
        dispatch(meetingActions.setMeeting(meetingId))
    }

    let idx = 0;
    const timeBlocks = [...Array(24).keys()].map(hour => {
        const meetingList = []
        while (idx < meetings.length) {
            const meetingStartHour = +(meetings[idx].startTime.split(':')[0])
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