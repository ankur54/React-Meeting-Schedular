import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import classes from './AddMeetingForm.module.css';
import timeFormatter from '../../../../utils/Time Formater/TimeFormatter';


const AddMeetingForm = ({ displayForm }) => {
    const [render, setRender] = useState(displayForm)
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [attendees, setAttendees] = useState([])

    const token = useSelector(state => state.authentication.token)
    
    useEffect(() => {
        if (displayForm) setRender(prev => prev = true)
    }, [displayForm])

    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 401) throw new Error(response.error)
            const users = await response.json()
            setUsers(users)
        }
        catch (error) {
            console.log(error.message)
        }
    }, [])

    const onUnMount = () => {
        if (!displayForm) setRender(prev => prev = false)
    }
    const onChangeTitle = e => setTitle(e.target.value)
    const onChangeDescription = e => setDescription(e.target.value)
    const onChangeDate = e => setDate(e.target.value)
    const onChangeStartTime = e => setStartTime(e.target.value)
    const onChangeEndTime = e => setEndTime(e.target.value)
    const onChangeAttendee = e => setAttendees([ e.target.value ])
    const onSubmitFormHandler = async e => {
        e.preventDefault()

        try {
            const user = {
                title,
                description,
                date,
                startTime: timeFormatter(startTime),
                endTime: timeFormatter(endTime),
                attendees
            }
            console.log(user)
            let res = await fetch('http://localhost:8000/meeting/add', {
                method: 'POST',
                body: JSON.stringify({ ...user }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            
            res = await res.json()
            if (res.error) throw new Error(res.error)
            // [ TODO ] show success message
            console.log(res)
        }
        catch (error) {
            // [ TODO ] show error message
            console.log(error.message)
        }
        finally {
            setTitle('')
            setDate('')
            setDescription('')
            setStartTime('')
            setEndTime('')
            setAttendees([])
        }
    }


    const optionsList = users.map(user => (
        <option
            key={user._id}
            value={user.email}
        >{user.name}</option>
    ))

    const dateObj = new Date()
    const currDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`
    const currTime = `${dateObj.getHours()}:${dateObj.getMinutes()}`

    return render && (
        <form 
            action="" 
            method="post" 
            onSubmit={onSubmitFormHandler}
            className={`${classes['create-meeting']} ${displayForm ? classes.show : classes.hide}`}
            onAnimationEnd={onUnMount}
        >
            <input 
                onChange={onChangeTitle} 
                type="text" 
                name="meeting-title" 
                id={classes['create-meeting-title']} 
                required 
                placeholder="Enter meeting title"
                value={title}
            />
            <div className={classes['meeting-date-container']}>
                <label>Select meeting date</label>
                <input 
                    onChange={onChangeDate} 
                    type="date" 
                    name="meeting-date" 
                    id={classes['create-meeting-date']}
                    value={date}
                    min={currDate}
                />
            </div>
            <div className={classes['start-time-container']}>
                <label>Start Time</label>
                <input 
                    onChange={onChangeStartTime} 
                    type="time" 
                    name="meeting-start-time" 
                    id={classes['create-meeting-start-time']}
                    value={startTime}
                    min={currTime}
                />
            </div>
            <div className={classes['end-time-container']}>
                <label>End Time</label>
                <input 
                    onChange={onChangeEndTime} 
                    type="time" 
                    name="meeting-end-time" 
                    id={classes['create-meeting-end-time']}
                    value={endTime}
                    min={startTime}
                />
            </div>
            <input 
                onChange={onChangeDescription} 
                type="text" 
                name="meeting-description" 
                id={classes['create-meeting-description']} 
                placeholder="What the meeting is about?"
                value={description}
            />
            <select 
                onChange={onChangeAttendee} 
                name="select-attendee" 
                id={classes['select-attendee']}
                value={attendees && attendees.length > 0 ? 
                    attendees[0] : ''}
            >
                <option>Choose an Attendee</option>
                { optionsList }
            </select>
            <button 
                type='submit' 
                className={classes['create-meeting']}
                onClick={onSubmitFormHandler}
            >
                <i className={classes['far fa-handshake']}></i>
                Create Meeting
            </button>
        </form>
    )
}

export default AddMeetingForm;