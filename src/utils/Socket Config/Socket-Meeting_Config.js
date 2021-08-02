import socket from "./SocketConfig";
import { meetingActions } from "../../store/MeetingStore";

export const meetingSocketConfig = (dispatch, userId) => {
	socket.on("meetings", (data) => {
		if (data.action === "CREATE") {
			const newMeeting = data.meeting;
			dispatch(meetingActions.addMeeting([newMeeting]));
		} else if (data.action === "ADD USER") {
			const newMeeting = data.meeting;
			const modifiedUser = data.user;

			if (userId === modifiedUser._id) {
				dispatch(meetingActions.addMeeting([newMeeting]));
			} else {
				dispatch(meetingActions.updateMeeting({ meeting: newMeeting }));
				dispatch(meetingActions.setMeeting(newMeeting._id));
			}
		} else if (
			data.action === "REMOVE USER" ||
			data.action === "REJECTED"
		) {
			const newMeeting = data.meeting;
			const userid = data.userId;

			dispatch(meetingActions.updateMeeting({ meeting: newMeeting }));
			if (userId !== userid) {
				dispatch(meetingActions.setMeeting(newMeeting._id));
			}
		} else if (data.action === "ACCEPTED") {
			const newMeeting = data.meeting;
			const userid = data.userId;
			dispatch(meetingActions.updateMeeting({ meeting: newMeeting }));
			dispatch(meetingActions.setMeeting(newMeeting._id));
		}
	});
};
