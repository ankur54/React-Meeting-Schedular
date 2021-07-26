import { useState, useEffect } from 'react';
import classes from './AddMeetingForm.module.css';

const AddMeetingForm = ({ displayForm }) => {
    const [render, setRender] = useState(displayForm)
    
    useEffect(() => {
        if (displayForm) setRender(prev => prev = true)
    }, [displayForm])

    const onUnMount = () => {
        if (!displayForm) setRender(prev => prev = false)
    }

    return render && (
        <form 
            action="" 
            method="post" 
            className={`${classes['create-meeting']} ${displayForm ? classes.show : classes.hide}`}
            onAnimationEnd={onUnMount}
        >
            <input type="text" name="meeting-title" id={classes['create-meeting-title']} required placeholder="Enter meeting title"/>
            <div className={classes['meeting-date-container']}>
                <label>Select meeting date</label>
                <input type="date" name="meeting-date" id={classes['create-meeting-date']}/>
            </div>
            <div className={classes['start-time-container']}>
                <label>Start Time</label>
                <input type="time" name="meeting-start-time" id={classes['create-meeting-start-time']}/>
            </div>
            <div className={classes['end-time-container']}>
                <label>End Time</label>
                <input type="time" name="meeting-end-time" id={classes['create-meeting-end-time']}/>
            </div>
            <input type="text" name="meeting-description" id={classes['create-meeting-description']} placeholder="What the meeting is about?"/>
            <select name="select-attendee" id={classes['select-attendee']}>
                <option>Choose an Attendee</option>
                <option value="user.name@mail.domain">Attendee 1</option>
                <option value="user.name@mail.domain">Attendee 2</option>
                <option value="user.name@mail.domain">Attendee 3</option>
                <option value="user.name@mail.domain">Attendee 4</option>
                <option value="user.name@mail.domain">Attendee 5</option>
                <option value="user.name@mail.domain">Attendee 6</option>
                <option value="user.name@mail.domain">Attendee 7</option>
                <option value="user.name@mail.domain">Attendee 8</option>
                <option value="user.name@mail.domain">Attendee 9</option>
                <option value="user.name@mail.domain">Attendee 10</option>
            </select>
            <button className={classes['create-meeting']}>
                <i className={classes['far fa-handshake']}></i>
                Create Meeting
            </button>
        </form>
    )
}

export default AddMeetingForm;