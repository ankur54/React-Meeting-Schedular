import classes from './Schedule.module.css';

import TimeManager from './Time Manager/TimeManager';

const Schedule = props => {
    const { date, changeEventClickedHandler } = props
    const [ year, month, dateNumber, day ] = date.split(' ')

    return (
        <section className={classes['daily-schedule']}>
            <h2 className={classes['today-date']}>{`${dateNumber} ${month}, ${year}`}</h2>
            <h3 className={classes['today-day']}>{`${day}`}</h3>
            <TimeManager onEventClick={changeEventClickedHandler} />
        </section>
    )
}

export default Schedule;