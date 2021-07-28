import classes from './Calendar.module.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useEffect, useState } from 'react';

const Calendar = props => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('23:59')
    const [showMonthSelector, setShowMonthSelector] = useState(false)
    const [dateClicked, setDateClicked] = useState(new Date().getDate())

    const { changeDateHandler } = props

    useEffect(() => {
        const day = new Date(year, month, dateClicked).getDay()
        console.log(year, month, dateClicked, day)
        changeDateHandler(year, month, dateClicked, day)
    }, [])

    const changeMonthHandler = monthIdx => {
        setShowMonthSelector(prev => prev = false)
        setMonth(prevMonth => prevMonth = monthIdx)
    }

    const selectMonthHandler = () => {
        setShowMonthSelector(prev => prev = true)
    }

    const nextYearHandler = () => {
        setYear(prevYear => prevYear + 1)
    }

    const prevYearHandler = () => {
        setYear(prevYear => prevYear - 1)
    }

    const changeStartTimeHandler = e => {
        setStartTime(prevStartTime => prevStartTime = e.target.value)
    }

    const changeEndTimeHandler = e => {
        setEndTime(prevEndTime => prevEndTime = e.target.value)
    }

    const dateClickHandler = dayNumber => {
        const day = new Date(year, month, dayNumber).getDay()

        setDateClicked(dayNumber)
        changeDateHandler(year, month, dayNumber, day)
    }

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || 
                (year % 100 === 0 && year % 400 ===0)
    }

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28
    }

    const generateCalendar = () => {
        const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const calendarDays = []
        const currDate = new Date()
        const firstDay = new Date(year, month, 1)

        for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
            let dayElement = (
                <div 
                    key={`blank-day-${i}`} 
                    className={classes['days-number']}>
                </div>
            )

            if (i >= firstDay.getDay()) {
                const dayNumber = i - firstDay.getDay() + 1;
                const isCurrDate = (dayNumber === currDate.getDate() && 
                                    year === currDate.getFullYear() && 
                                    month === currDate.getMonth())
                const day = new Date(year, month, dayNumber).getDay()
                const fullDate = `${year}-${month}-${dayNumber}-${day}`
                dayElement = (
                    <div 
                    key={fullDate}
                    className={`${classes['days-number']} 
                                ${classes.show} 
                                ${isCurrDate && classes['curr-date']} 
                                ${(dateClicked === dayNumber) && classes.active}`}
                    onClick={dateClickHandler.bind(this, dayNumber)}
                    >{dayNumber}
                    </div>
                )
            }
            calendarDays.push(dayElement)
        }
        return calendarDays;
    }

    const monthBlocks = monthNames.map((month, monthIdx) => (
        <div 
            key={`${month}-${monthIdx}`}
            className={classes['month-block']}
            onClick={changeMonthHandler.bind(this, monthIdx)}
        >{month}
        </div>
    ))

    return (
        <div className={classes.calendar}>
            <div 
                className={`${classes['month-list']} ${showMonthSelector && classes.show}`}
            >{monthBlocks}
            </div>
            <div className={classes['calendar-header']}>
                <div className={classes['year-selector']}>
                    <NavigateNextIcon 
                        onClick={prevYearHandler}
                        className={classes['prev-year']} 
                    />
                    <span className={classes.year}>{year}</span>
                    <NavigateNextIcon 
                        onClick={nextYearHandler}
                        className={classes['next-year']} 
                    />
                </div>
                <div 
                    className={classes['month-selector']}
                    onClick={selectMonthHandler}
                >{monthNames[month]}
                </div>
                <input 
                    type="time" 
                    name="start-time" 
                    value={startTime}
                    id={classes['filter-start-time']} 
                    onChange={changeStartTimeHandler}
                />
                <input 
                    type="time" 
                    name="end-time" 
                    value={endTime}
                    id={classes['filter-end-time']} 
                    onChange={changeEndTimeHandler}
                />
            </div>
            <div className={classes['calendar-body']}>
                <div className={classes['calendar-week-days']}>
                    {
                        dayNames.map(dayName => (
                            <div 
                                key={dayName}
                                className={classes['week-day']}
                            > {dayName.charAt(0)}
                            </div>
                        ))
                    }
                </div>
                <div className={classes['calendar-days']}>
                    {generateCalendar()}
                </div>
            </div>
        </div>
    )
}

export default Calendar;