import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	meetings: [],
	selectedMeeting: null,
};

const meetingSlice = createSlice({
	name: "Meeting",
	initialState: initialState,
	reducers: {
		overwriteMeetings(state, action) {
			state.meetings = action.payload;
		},
		addMeeting(state, action) {
			state.meetings = [...state.meetings, ...action.payload];
		},
		deleteMeeting(state, action) {
			state.meetings = state.meetings.filter(
				(meeting) => meeting._id !== action.payload.meeting._id
			);
			state.selectedMeeting =
				state.selectedMeeting &&
				state.selectedMeeting._id === action.payload.meeting._id &&
				null;
		},
		updateMeeting(state, action) {
			const idx = state.meetings.findIndex(
				(meeting) => meeting._id === action.payload.meeting._id
			);
			state.meetings.splice(idx, 1, action.payload.meeting);
			state.selectedMeeting =
				state.selectedMeeting &&
				state.selectedMeeting._id === action.payload.meeting._id &&
				action.payload.meeting;
		},
		setMeeting(state, action) {
			state.selectedMeeting = state.meetings.find(
				(meeting) => meeting._id === action.payload
			);
		},
	},
});

export default meetingSlice.reducer;
export const meetingActions = meetingSlice.actions;
