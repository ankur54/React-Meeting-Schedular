import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthStore";
import meetingReducer from "./MeetingStore";
import applicationReducer from "./AppStore";
import teamReducer from "./TeamStore";
import notificationReducer from "./NotificationStore";

const store = configureStore({
	reducer: {
		authentication: authReducer,
		meeting: meetingReducer,
		application: applicationReducer,
		team: teamReducer,
		notification: notificationReducer,
	},
});

export default store;
