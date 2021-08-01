import { configureStore } from '@reduxjs/toolkit'

import authReducer from './AuthStore'
import meetingReducer from './MeetingStore'
import applicationReducer from "./AppStore";

const store = configureStore({
    reducer: {
        authentication: authReducer,
        meeting: meetingReducer,
        application: applicationReducer
    }
})

export default store;