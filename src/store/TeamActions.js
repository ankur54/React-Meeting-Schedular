import { notificationActions } from "./NotificationStore";
import { teamActions } from "./TeamStore";

export const fetchTeams = (token) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8000/team", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok)
				throw new Error("Error occured when fetching teams data");

			const teams = await response.json();
			return teams;
		};

		try {
			const teams = await fetchData();
			dispatch(teamActions.overwriteTeams([...teams]));
		} catch (err) {
			dispatch(
				notificationActions.setNotification({
					title: "Error occured",
					message: err.message,
					type: "DANGER",
				})
			);
			console.log(err.message);
		}
	};
};
