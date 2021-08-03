import { meetingActions } from "./MeetingStore";
import { notificationActions } from "./NotificationStore";

export const fetchMeetings = (
	token,
	_date,
	_month,
	year,
	startTime,
	endTime
) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const date = _date.toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});
			const month = (_month + 1).toLocaleString("en-US", {
				minimumIntegerDigits: 2,
				useGrouping: false,
			});
			const fullDate = `${year}-${month}-${date}`;
			let response = await fetch(
				`http://localhost:8000/meeting?date=${fullDate}&startTime=${startTime}&endTime=${endTime}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok)
				throw new Error("Error occured when fetching meetings data");

			const meetings = await response.json();
			return meetings;
		};

		try {
			const meetings = await fetchData();
			dispatch(meetingActions.overwriteMeetings([...meetings]));
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "An error occured while fetching meetings",
					message: err.message,
					type: "DANGER",
				})
			);
			console.log(err.message);
		}
	};
};
