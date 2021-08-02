import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	teams: [],
};

const teamSlice = createSlice({
	name: "Team",
	initialState: initialState,
	reducers: {
		overwriteTeams(state, action) {
			state.teams = action.payload;
		},
		addTeam(state, action) {
			state.teams = [...state.teams, ...action.payload];
		},
		deleteTeam(state, action) {
			state.teams = state.teams.filter(
				(team) => team._id !== action.payload.team._id
			);
		},
		updateTeam(state, action) {
			const idx = state.teams.findIndex(
				(team) => team._id === action.payload.team._id
			);
			state.teams.splice(idx, 1, action.payload.team);
		}
	},
});

export default teamSlice.reducer;
export const teamActions = teamSlice.actions;
