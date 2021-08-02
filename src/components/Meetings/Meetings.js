import classes from "./Meetings.module.css";
import { meetingSocketConfig } from "../../utils/Socket Config/Socket-Meeting_Config";
import Schedule from "./Daily Schedule/Schedule";
import CalendarEvents from "./Calendar Events/CalendarEvents";
import { fetchMeetings } from "../../store/MeetingActions";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Meetings = (props) => {
	const [eventClicked, setEventClicked] = useState(false);

	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.userId);
	const token = useSelector((state) => state.authentication.token);
	let date = useSelector((state) => state.application.date);
	let month = useSelector((state) => state.application.month);
	let year = useSelector((state) => state.application.year);
	const startTime = useSelector((state) => state.application.startTime);
	const endTime = useSelector((state) => state.application.endTime);

	// getting all the meetings
	useEffect(() => {
		dispatch(fetchMeetings(token, date, month, year, startTime, endTime));
	}, [date, month, year, startTime, endTime]);
	
	// configuring socket io client
	useEffect(() => {
		meetingSocketConfig(dispatch, userId);
	}, [])

	const changeEventClickedHandler = () => {
		setEventClicked((prev) => !prev);
	};
	const { displayForm } = props;

	return (
		<main className={classes["meeting-main-content"]}>
			<Schedule
				changeEventClickedHandler={changeEventClickedHandler}
				date={date}
			/>
			<CalendarEvents
				displayForm={displayForm}
				displayEventDetails={eventClicked}
			/>
		</main>
	);
};

export default Meetings;
