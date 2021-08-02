import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthStore";
import meetingReducer from "./MeetingStore";
import applicationReducer from "./AppStore";
import teamReducer from "./TeamStore";

const store = configureStore({
	reducer: {
		authentication: authReducer,
		meeting: meetingReducer,
		application: applicationReducer,
		team: teamReducer,
	},
});

export default store;
