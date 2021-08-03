import { useDispatch, useSelector } from "react-redux";

import classes from "./MeetingBlock.module.css";
import { meetingActions } from "../../../../../store/MeetingStore";

const MeetingBlock = (props) => {
	const { meetings } = props;
	const userEmail = useSelector((state) => state.authentication.userEmail);
	const dispatch = useDispatch();

	const meetingsList = meetings.map((meeting) => {
		const { _id, title, startTime, endTime } = meeting;
		const onEventClick = (e) => {
			e.stopPropagation();
			dispatch(meetingActions.setMeeting(_id));
		};
		const durationInMinutes = (() => {
			const [startHr, startMin] = startTime.split(":");
			const [endHr, endMin] = endTime.split(":");
			return (
				(parseInt(endHr) - parseInt(startHr)) * 60 +
				(parseInt(endMin) - parseInt(startMin))
			);
		})();
		const meetingStartOffset = startTime.split(":")[1];
		const _user = meeting.attendees.find(
			(attendee) => attendee.email === userEmail
		);
		const userStatus = _user && _user.status;
		let backgroundColor = "rgba(145, 145, 145, 0.2)";
		let borderColor = "rgba(145, 145, 145, 0.8)";

		if (userStatus === "ACCEPT") {
			backgroundColor = "rgba(86, 190, 135, 0.2)";
			borderColor = "rgba(86, 190, 135, 0.8)";
		}

		if (userStatus === "REJECT") {
			backgroundColor = "rgba(191, 86, 86, 0.2)";
			borderColor = "rgba(191, 86, 86, 0.8)";
		}

		return (
			<div
				key={_id}
				className={classes["meeting-range"]}
				style={{
					height: `calc((5em / 60) * ${durationInMinutes})`,
					top: `calc(10px + (5em / 60) * ${meetingStartOffset})`,
					backgroundColor: backgroundColor,
					borderLeftColor: borderColor,
				}}
				onClick={onEventClick}
			>
				<h4
					className={classes['meeting-title']}
					style={{ color: borderColor }}
				>{title}
				</h4>
				{/* <svg
					className={classes["meeting-title"]}
					style={{ fill: borderColor }}
				>
					<text x="10" y="20">
						{title}
					</text>
				</svg> */}
			</div>
		);
	});

	return meetingsList;
};

export default MeetingBlock;
