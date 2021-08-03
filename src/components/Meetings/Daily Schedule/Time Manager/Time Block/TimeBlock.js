import { useEffect } from "react";

import classes from "./TimeBlock.module.css";
import { meetingActions } from "../../../../../store/MeetingStore";
import { useDispatch } from "react-redux";

const TimeBlock = (prop) => {
	let { startTime, children } = prop;
	const acronym = startTime >= 12 ? "pm" : "am";
	startTime = startTime > 12 ? startTime % 12 : startTime;
	startTime = startTime === 0 ? startTime + 12 : startTime;

	const dispatch = useDispatch();
	const onClickHandler = () => {
		dispatch(meetingActions.setMeeting(null));
	};

	return (
		<div className={classes["schedule-time"]} onClick={onClickHandler}>
			{children}
			<div className={classes["time-start"]}>
				{`${startTime} ${acronym}`}
			</div>
		</div>
	);
};

export default TimeBlock;
