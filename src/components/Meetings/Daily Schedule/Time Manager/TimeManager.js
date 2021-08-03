import classes from "./TimeManager.module.css";

import TimeBlock from "./Time Block/TimeBlock";
import CurrentTimeIndicator from "./Current Time Indicator/CurrentTimeIndicator";
import MeetingBlock from "./Meeting Block/MeetingBlock";
import { meetingActions } from "../../../../store/MeetingStore";
import { applicationActions } from "../../../../store/AppStore";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const TimeManager = (props) => {
	const currHr = useSelector((state) => state.application.currHour);
	let meetings = [...useSelector((state) => state.meeting.meetings)];
	meetings.sort((meeting1, meeting2) => {
		const hour1 = +meeting1.startTime.split(":")[0];
		const hour2 = +meeting2.startTime.split(":")[0];
		return hour1 - hour2;
	});

	const dispatch = useDispatch();
	let interval = null;

	// update hour every 60 * 60 * 1000 ms interval
	useEffect(() => {
		interval = setInterval(() => {
			dispatch(applicationActions.incrementCurrHour());
		}, 60 * 60 * 1000);
	});

	// clear timer on component unmount
	useEffect(() => {
		return () => {
			if (interval) clearInterval(interval);
		};
	}, []);

	const onEventClick = (meetingId) => {
		dispatch(meetingActions.setMeeting(meetingId));
	};

	const getCurrTimer = (hour) => {
		return currHr === hour && <CurrentTimeIndicator currHour={hour} />;
	};

	let idx = 0;
	const timeBlocks = [...Array(24).keys()].map((hour) => {
		const meetingList = [];
		while (idx < meetings.length) {
			const meetingStartHour = +meetings[idx].startTime.split(":")[0];
			if (meetingStartHour && meetingStartHour === hour) {
				meetingList.push(meetings[idx++]);
			} else break;
		}

		return (
			<TimeBlock key={`${hour}:00`} startTime={hour}>
				{getCurrTimer(hour)}
				<MeetingBlock
					meetings={meetingList}
					onEventClick={onEventClick}
				/>
			</TimeBlock>
		);
	});
	return <div className={classes["schedule-display"]}>{timeBlocks}</div>;
};

export default TimeManager;
