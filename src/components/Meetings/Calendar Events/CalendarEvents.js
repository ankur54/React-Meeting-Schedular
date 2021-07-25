import classes from './CalendarEvents.module.css'

import Calendar from './Calendar/Calendar'
import AddMeetingForm from './Add Meeting Form/AddMeetingForm'
import EventDetails from './Event Details/EventDetails'

const CalendarEvents = props => {
    const { 
            displayForm, 
            displayEventDetails, 
            setDateHandler 
        } = props

    return(
        <section className={classes['calendar-operation']}>
            <Calendar changeDateHandler={setDateHandler}/>
            <AddMeetingForm displayForm={displayForm}/>
            <EventDetails displayEventDetails={displayEventDetails}/>
        </section>
    )
}

export default CalendarEvents;