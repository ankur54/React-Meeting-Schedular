import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./EventDetails.module.css";

const EventDetails = () => {
  // animation on mount and unmount
  const meetingDetails = useSelector((state) => state.meeting.selectedMeeting);
  const [render, setRender] = useState(!!meetingDetails);

  useEffect(() => {
    if (!!meetingDetails) setRender(true);
  }, [!!meetingDetails]);

  const onUnmount = () => {
    if (!!!meetingDetails) setRender(false);
  };

  const meetingAttendees = !!meetingDetails
    ? meetingDetails.attendees.map((attendee) => <div>{attendee.email}</div>)
    : [];

  return (
    render && (
      <div
        className={`${classes["event-details"]} 
                        ${!!meetingDetails ? classes.show : classes.hide}`}
        onAnimationEnd={onUnmount}
      >
        <h3 className={classes["event-title"]}>{meetingDetails.title}</h3>
        <div className={classes["event-scrollable-section"]}>
          <p className={classes["event-description"]}>
            {meetingDetails.description}
          </p>
          <div className={classes["event-attendees"]}>{meetingAttendees}</div>
        </div>
      </div>
    )
  );
};

export default EventDetails;
