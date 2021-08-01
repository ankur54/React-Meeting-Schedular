import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currHour: new Date().getHours(),
	currMinute: new Date().getMinutes(),
	startTime: "00:00",
	endTime: "23:59",
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
	date: new Date().getDate(),
};

const AppSlice = createSlice({
	name: "Application",
	initialState,
	reducers: {
		incrementCurrHour(state) {
			state.currHour += 1;
		},
		incrementCurrMinute(state) {
			state.currMinute += 1;
		},
		setStartTime(state, action) {
			state.startTime = action.payload;
		},
		setEndTime(state, action) {
			state.endTime = action.payload;
		},
		incrementYear(state) {
			state.year = state.year + 1;
		},
		decrementYear(state) {
			state.year = state.year - 1;
		},
		changeMonth(state, action) {
			state.month = action.payload;
		},
		changeDate(state, action) {
			state.date = action.payload;
		},
	},
});

export default AppSlice.reducer;
export const applicationActions = AppSlice.actions;
