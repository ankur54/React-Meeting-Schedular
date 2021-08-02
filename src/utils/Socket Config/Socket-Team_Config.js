import socket from "../../utils/Socket Config/SocketConfig";
import { teamActions } from "../../store/TeamStore";

export const teamSocketConfig = (dispatch, userId) => {
	socket.on("teams", (data) => {
		if (data.action === "CREATE") {
			const newTeam = data.team;
			const check = !!newTeam.members.find(
				(member) => member._id.toString() === userId
			);
			if (check) dispatch(teamActions.addTeam([newTeam]));
		} else if (data.action === "ADD USER") {
			const newTeam = data.team;
			const modifiedUser = data.user;

			if (userId === modifiedUser._id) {
				dispatch(teamActions.addTeam([newTeam]));
			} else {
				dispatch(teamActions.updateTeam({ team: newTeam }));
			}
		} else if (data.action === "REMOVE USER") {
			const newTeam = data.team;
			const userid = data.user._id;
			console.log(userid, userId)
			if (userId === userid)
				dispatch(teamActions.deleteTeam({ team: newTeam }));
			else dispatch(teamActions.updateTeam({ team: newTeam }));
		}
	});
};
