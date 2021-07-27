import classes from './Schedule.module.css';

import TimeManager from './Time Manager/TimeManager';

const Schedule = props => {
    const { date, changeEventClickedHandler } = props
    const { year, month, dateNum, day } = date
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const dateString = new Date(year, month, dateNum + 1).toISOString().split('T')[0]

    return (
        <section className={classes['daily-schedule']}>
            <h2 className={classes['today-date']}>{`${dateNum} ${monthNames[month]}, ${year}`}</h2>
            <h3 className={classes['today-day']}>{`${dayNames[day]}`}</h3>
            <TimeManager 
                date={dateString}
                onEventClick={changeEventClickedHandler} 
            />
        </section>
    )
}

export default Schedule;