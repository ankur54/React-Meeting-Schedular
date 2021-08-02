import { useSelector } from "react-redux";
import classes from "./MeetingBlock.module.css";

const MeetingBlock = (props) => {
	const { meetings, onEventClick } = props;
	const userEmail = useSelector((state) => state.authentication.userEmail);

	const meetingsList = meetings.map((meeting) => {
		const { _id, startTime, endTime } = meeting;
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
				onClick={onEventClick.bind(this, _id)}
			></div>
		);
	});

	return meetingsList;
};

export default MeetingBlock;
