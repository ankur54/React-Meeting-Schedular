import { useState, useEffect } from 'react';
import classes from './EventDetails.module.css';

const EventDetails = ({ displayEventDetails }) => {
    // animation on mount and unmount
    const [render, setRender] = useState(displayEventDetails)
    useEffect(() => {
        if (displayEventDetails)
            setRender(true)
    }, [displayEventDetails])

    const onUnmount = () => {
        if (!displayEventDetails) 
            setRender(false)
    }

    return render && (
        <div 
            className={`${classes["event-details"]} 
                        ${displayEventDetails ? classes.show : classes.hide}`}
            onAnimationEnd={onUnmount}
        >
            <h3 className={classes['event-title']}>
                UNext - Welcome to Tech Bootcamp Training Program
            </h3>
            <div className={classes['event-scrollable-section']}>
                <p className={classes['event-description']}>
                    Greetings!
                    <br/>
                    <br/>
                    Blocking your calendar for the Tech Bootcamp (Training Program).
                    <br/>
                    <br/>
                    The training program will be conducted using Microsoft Teams academic version platform. We have sent the welcome emailer with MS teams login credentials with the detailed login steps.
                    Please ensure to join the training session via the MS teams credentials sent to your email id.
                    <br/>
                    <br/>
                    Tomorrow we will have the orientation session from 9.0 AM to 9:30 AM, we will take you through the program overview and the program logistics.
                </p>
                <div className={classes['event-attendees']}>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                    test1@mail.com <br/>
                </div>
            </div>
        </div>
    )
}

export default EventDetails