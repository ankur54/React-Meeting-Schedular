import classes from './Meetings.module.css';

import Schedule from './Daily Schedule/Schedule';
import CalendarEvents from './Calendar Events/CalendarEvents';
import { useState } from 'react';

const Meetings = props => {
    const [eventClicked, setEventClicked] = useState(false)
    const [date, setDate] = useState('')

    const changeEventClickedHandler = () => { setEventClicked(prev => !prev) }
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
                setDateHandler={setDate}
            />
        </main>
    )
}

export default Meetings;