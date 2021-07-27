import classes from './Meetings.module.css';

import Schedule from './Daily Schedule/Schedule';
import CalendarEvents from './Calendar Events/CalendarEvents';
import { useState } from 'react';

const Meetings = props => {
    const [eventClicked, setEventClicked] = useState(false)
    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        dateNum: new Date().getDate(),
        day: new Date().getDay()
    })

    const changeEventClickedHandler = () => { setEventClicked(prev => !prev) }
    const changeDateHandler = (year, month, dateNum, day) => {
        setDate({year, month, dateNum, day})
    }
    const { displayForm } = props
    
    return (
        <main>
            <Schedule 
                changeEventClickedHandler={changeEventClickedHandler}
                date={date}
            />
            <CalendarEvents 
                displayForm={displayForm}
                displayEventDetails={eventClicked}
                setDateHandler={changeDateHandler}
            />
        </main>
    )
}

export default Meetings;